import { NextResponse } from "next/server";
import connectToDB from "../../../lib/db";
import Todo from "../../../lib/modals/TodoModel";

export async function GET() {
  try {
    await connectToDB();
    const todos = await Todo.find();
    return NextResponse.json(todos);
  } catch (err: any) {
    const errorMessage = err.message || "Failed to fetch todos";
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, items, isStarred } = body;

    await connectToDB();

    const todo = await Todo.create({
      title: title,
      items: items,
      isStarred: isStarred,
    });

    return NextResponse.json(todo.title + "Created Successfully");
  } catch (err: any) {
    const errorMessage = err.message || "Failed to submit todo";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
