'use client';

import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";

const strategies = [
  { name: "Role-based prompting", level: "Основна", template: "Като [роля], обясни [тема] на [аудитория].", example: "Като UX дизайнер, обясни какво е интуитивен интерфейс на ученик в 10. клас." },
  { name: "Chain-of-thought prompting", level: "Основна", template: "Обясни [сложна тема], разсъждавайки стъпка по стъпка.", example: "Обясни как работи криптовалутата, разсъждавайки стъпка по стъпка." },
  { name: "Few-shot prompting", level: "Основна", template: "Ето два примера. Създай трети в същия стил: ...", example: "Ето два анекдота за програмисти. Създай трети в същия стил: ..." },
  { name: "Rewriting", level: "Основна", template: "Пренапиши този текст, за да звучи по-[стил].", example: "Пренапиши този параграф, за да звучи по-официално и уверено." },
  { name: "Multi-agent prompting", level: "Напреднала", template: "AI1 защитава [теза], AI2 – опонира. Симулирай дебат с 3 рунда.", example: "AI1 защитава използването на реклами, AI2 – опонира с аргументи за органичен трафик. Симулирай дебат с 3 рунда." }
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

\`\`\`
${selected.template}
\`\`\`

**Примерна реализация:**
\`\`\`
${selected.example || "[добавете ваш пример]"}
\`\`\`
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
                    <Button size="sm" variant="outline" onClick={() => setGeneratedTask(item.content)}>Зареди</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteTask(index)}>Изтрий</Button>
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

