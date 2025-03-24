import { NextRequest, NextResponse } from "next/server";
import connectToDB from "../../../lib/db";
import Todo from "../../../lib/modals/TodoModel";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const search = searchParams.get("search");
    const isStarred = searchParams.get("isStarred");
    console.log(search, "url");

    await connectToDB();
    let todos: Array<typeof Todo> = [];
    if (isStarred) {
      todos = await Todo.find({
        isStarred: isStarred,
        title: search ? { $regex: search, $options: "i" } : { $exists: true },
      }).sort("-createdAt");
    } else {
      todos = await Todo.find({
        title: search ? { $regex: search, $options: "i" } : { $exists: true },
      }).sort("-createdAt");
    }
    return NextResponse.json(todos);
  } catch (err: any) {
    const errorMessage = err.message || "Failed to fetch todos";
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, items, isStarred } = body;

    await connectToDB();

    const todo = await Todo.create({
      title: title,
      items: items,
      isStarred: isStarred,
    });

    return NextResponse.json({
      todo: todo,
      message: todo.title + "Created Successfully",
    });
  } catch (err: any) {
    const errorMessage = err.message || "Failed to submit todo";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
