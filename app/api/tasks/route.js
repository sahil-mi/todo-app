import { NextResponse } from "next/server";
import connectToDB from "../../../lib/db";
import Todo from "../../../lib/modals/TodoModel";

// GET Request Handler
export async function GET() {
  try {
    await connectToDB();
    let todos = await Todo.find();
    todos = JSON.stringify(todos);
    return NextResponse.json(todos);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST Request Handler
export async function POST(req) {
  const body = await req.json();
  const newTask = { id: Date.now(), ...body };
  return NextResponse.json(newTask, { status: 201 });
}
