import { NextResponse, NextRequest } from "next/server";
import connectToDB from "../../../../lib/db";
import Todo from "../../../../lib/modals/TodoModel";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const todos = await Todo.findById(id);
    return NextResponse.json(todos);
  } catch (err: any) {
    const errorMessage = err.message || "Failed to fetch todos";
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDB();
    const body = await request.json();
    const { title, items, isStarred } = body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, items, isStarred },
      { new: true }
    );
    return new NextResponse(todo);
  } catch (err: any) {
    const errorMessge = err.message || "Failed to update";
    return new NextResponse(errorMessge, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDB();
    await Todo.findByIdAndDelete(id);
    return new NextResponse("Deleted Successfully");
  } catch (err: any) {
    const errorMessge = err.message || "Failed to delete";
    return new NextResponse(errorMessge, { status: 500 });
  }
}
