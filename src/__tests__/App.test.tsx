import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("アプリタイトルが表示されている", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Todoアプリ!" })
    ).toBeInTheDocument();
  });

  test("Todoを追加できる", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    // Todoを追加
    fireEvent.change(input, { target: { value: "新しいタスク" } });
    fireEvent.click(addButton);

    const list = screen.getByRole("list");
    expect(within(list).getByText("新しいタスク")).toBeInTheDocument();
    // 追加されたTodoが表示されていることを確認
    expect(screen.getByText("新しいタスク")).toBeInTheDocument();
  });

  test("Todoの完了状態を切り替えられる", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    // Todoを追加
    fireEvent.change(input, { target: { value: "完了切替タスク" } });
    fireEvent.click(addButton);

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    // チェックボックスがオンになっていることを確認
    expect(checkbox).toBeChecked();
  });

  test("完了したTodoが正しく表示される", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    fireEvent.change(input, { target: { value: "タスク1" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "タスク2" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox")[1];
    fireEvent.click(checkboxes); // 最初のTodoを完了にする

    expect(screen.getByText("完了済み: 1 / 2")).toBeInTheDocument();
  });

  test("Todoがない場合に適切なメッセージが表示される", () => {
    render(<App />);
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    expect(
      screen.getByText("新しいタスクを追加してください")
    ).toBeInTheDocument();
  });

  test("空のTodoは追加できない", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    // 空のTodoを追加しようとする
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    // Todoリストが空であることを確認
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });
});
