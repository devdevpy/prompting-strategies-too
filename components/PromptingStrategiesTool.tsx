'use client';

import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";

const strategies = [
  { name: "Стратегия 1", level: "Напреднала", template: "Шаблон за стратегия 1.", example: "Пример за стратегия 1." },
  { name: "Стратегия 2", level: "Основна", template: "Шаблон за стратегия 2.", example: "Пример за стратегия 2." },
  { name: "Стратегия 3", level: "Напреднала", template: "Шаблон за стратегия 3.", example: "Пример за стратегия 3." },
  { name: "Стратегия 4", level: "Основна", template: "Шаблон за стратегия 4.", example: "Пример за стратегия 4." },
  { name: "Стратегия 5", level: "Напреднала", template: "Шаблон за стратегия 5.", example: "Пример за стратегия 5." },
  { name: "Стратегия 6", level: "Основна", template: "Шаблон за стратегия 6.", example: "Пример за стратегия 6." },
  { name: "Стратегия 7", level: "Напреднала", template: "Шаблон за стратегия 7.", example: "Пример за стратегия 7." },
  { name: "Стратегия 8", level: "Основна", template: "Шаблон за стратегия 8.", example: "Пример за стратегия 8." },
  { name: "Стратегия 9", level: "Напреднала", template: "Шаблон за стратегия 9.", example: "Пример за стратегия 9." },
  { name: "Стратегия 10", level: "Основна", template: "Шаблон за стратегия 10.", example: "Пример за стратегия 10." },
  { name: "Стратегия 11", level: "Напреднала", template: "Шаблон за стратегия 11.", example: "Пример за стратегия 11." },
  { name: "Стратегия 12", level: "Основна", template: "Шаблон за стратегия 12.", example: "Пример за стратегия 12." },
  { name: "Стратегия 13", level: "Напреднала", template: "Шаблон за стратегия 13.", example: "Пример за стратегия 13." },
  { name: "Стратегия 14", level: "Основна", template: "Шаблон за стратегия 14.", example: "Пример за стратегия 14." },
  { name: "Стратегия 15", level: "Напреднала", template: "Шаблон за стратегия 15.", example: "Пример за стратегия 15." },
  { name: "Стратегия 16", level: "Основна", template: "Шаблон за стратегия 16.", example: "Пример за стратегия 16." },
  { name: "Стратегия 17", level: "Напреднала", template: "Шаблон за стратегия 17.", example: "Пример за стратегия 17." },
  { name: "Стратегия 18", level: "Основна", template: "Шаблон за стратегия 18.", example: "Пример за стратегия 18." },
  { name: "Стратегия 19", level: "Напреднала", template: "Шаблон за стратегия 19.", example: "Пример за стратегия 19." },
  { name: "Стратегия 20", level: "Основна", template: "Шаблон за стратегия 20.", example: "Пример за стратегия 20." },
  { name: "Стратегия 21", level: "Напреднала", template: "Шаблон за стратегия 21.", example: "Пример за стратегия 21." },
  { name: "Стратегия 22", level: "Основна", template: "Шаблон за стратегия 22.", example: "Пример за стратегия 22." },
  { name: "Стратегия 23", level: "Напреднала", template: "Шаблон за стратегия 23.", example: "Пример за стратегия 23." },
  { name: "Стратегия 24", level: "Основна", template: "Шаблон за стратегия 24.", example: "Пример за стратегия 24." },
  { name: "Стратегия 25", level: "Напреднала", template: "Шаблон за стратегия 25.", example: "Пример за стратегия 25." },
  { name: "Стратегия 26", level: "Основна", template: "Шаблон за стратегия 26.", example: "Пример за стратегия 26." },
  { name: "Стратегия 27", level: "Напреднала", template: "Шаблон за стратегия 27.", example: "Пример за стратегия 27." },
  { name: "Стратегия 28", level: "Основна", template: "Шаблон за стратегия 28.", example: "Пример за стратегия 28." },
  { name: "Стратегия 29", level: "Напреднала", template: "Шаблон за стратегия 29.", example: "Пример за стратегия 29." },
  { name: "Стратегия 30", level: "Основна", template: "Шаблон за стратегия 30.", example: "Пример за стратегия 30." }
];

export default function PromptingStrategiesTool() {
  const [selected, setSelected] = useState(strategies[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [filterAdvanced, setFilterAdvanced] = useState(false);
  const [generatedTask, setGeneratedTask] = useState("");
  const [taskHistory, setTaskHistory] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("prompting-task-history");
    if (saved) setTaskHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("prompting-task-history", JSON.stringify(taskHistory));
  }, [taskHistory]);

  const filteredStrategies = filterAdvanced
    ? strategies.filter((s) => s.level === "Напреднала")
    : strategies;

  const fillExample = () => {
    if (selected?.example) setCustomPrompt(selected.example);
  };

  const generateTask = () => {
    const title = taskTitle || selected.name;
    const task = `## AI Задание: ${title}

**Цел:** Демонстриране на стратегията "${selected.name}" чрез практически промпт.

**Контекст:** Потребител създава AI промпт с цел ${selected.level === "Основна" ? "обучение и експериментиране" : "напреднало приложение в професионална среда"}.

**Инструкции:** Използвай следния шаблон като основа:


${selected.template}


**Примерна реализация:**

${selected.example || "[добавете ваш пример]"}

`;
    setGeneratedTask(task);
    setTaskHistory((prev) => [{ title, content: task }, ...prev]);
    setTaskTitle("");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([generatedTask], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selected.name.replace(/\s+/g, "_")}_задание.md`;
    link.click();
  };

  const downloadPDF = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<pre style="font-family: Arial; white-space: pre-wrap; padding: 20px">${generatedTask}</pre>`);
    win.document.close();
    win.focus();
    win.print();
  };

  const deleteTask = (index) => {
    const updated = taskHistory.filter((_, i) => i !== index);
    setTaskHistory(updated);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">Интерактивен инструмент за промптинг стратегии</h1>

      <div className="flex flex-wrap items-center gap-3">
        <Switch checked={filterAdvanced} onCheckedChange={setFilterAdvanced} />
        <span className="text-slate-700">Показвай само напреднали стратегии</span>
      </div>

      <Select onValueChange={(value) => setSelected(strategies.find(s => s.name === value))}>
        <SelectTrigger className="w-full border-slate-300">
          <SelectValue placeholder="Изберете стратегия" />
        </SelectTrigger>
        <SelectContent>
          {filteredStrategies.map((strategy) => (
            <SelectItem key={strategy.name} value={strategy.name}>
              {strategy.name} ({strategy.level})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        className="w-full border-slate-300"
        placeholder="Заглавие на заданието (по избор)"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <Card className="bg-white border border-slate-200">
        <CardContent className="p-4 space-y-2">
          <p className="text-sm text-slate-500">Шаблон за промпт:</p>
          <Input
            className="w-full border-slate-300"
            value={customPrompt || selected.template}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigator.clipboard.writeText(customPrompt || selected.template)}>
          Копирай шаблона
        </Button>
        <Button className="w-full sm:w-auto flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800" onClick={fillExample}>
          Попълни пример
        </Button>
        <Button className="w-full sm:w-auto flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={generateTask}>
          Генерирай AI задание
        </Button>
      </div>

      {generatedTask && (
        <Card className="bg-white border border-slate-200">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-slate-500">Генерирано задание:</p>
            <Textarea className="w-full border-slate-300 text-sm" rows={12} value={generatedTask} readOnly />
            <div className="flex gap-3 mt-3 flex-col sm:flex-row">
              <Button className="flex-1 bg-slate-700 hover:bg-slate-800 text-white" onClick={downloadMarkdown}>
                Изтегли като Markdown
              </Button>
              <Button className="flex-1 bg-rose-700 hover:bg-rose-800 text-white" onClick={downloadPDF}>
                Изтегли като PDF (печат)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {taskHistory.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-700 border-b pb-1">История на заданията</h2>
          {taskHistory.map((item, index) => (
            <Card key={index} className="border-slate-100 bg-slate-50">
              <CardContent className="p-4 space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-sm font-medium text-slate-800">{item.title}</div>
                  <div className="flex gap-2">
                    <Button className="h-8 px-3 bg-white border text-slate-800" onClick={() => setGeneratedTask(item.content)}>Зареди</Button>
                    <Button className="h-8 px-3 bg-red-600 text-white" onClick={() => deleteTask(index)}>Изтрий</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
