// external import
import { useState } from "react";

// internal import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// dummy data
const materials = [
  {
    id: "btech3",
    name: "B.Tech 3rd Sem",
    items: [
      { id: 1, title: "Data Structures", file: "data_structures.pdf" },
      { id: 2, title: "Computer Networks", file: "computer_networks.pdf" },
    ],
  },
  {
    id: "btech5",
    name: "B.Tech 5th Sem",
    items: [
      { id: 3, title: "Database Management", file: "dbms.pdf" },
      { id: 4, title: "Operating Systems", file: "os.pdf" },
    ],
  },
  {
    id: "mtech1",
    name: "M.Tech 1st Sem",
    items: [
      { id: 5, title: "Advanced Algorithms", file: "adv_algorithms.pdf" },
      { id: 6, title: "Machine Learning", file: "machine_learning.pdf" },
    ],
  },
];

const MaterialsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(materials[0].id);

  const selectedMaterials =
    materials.find((m) => m.id === selectedCategory)?.items || [];
  return (
    <div className="flex h-[500px]">
      <Card className="w-1/4 mr-4">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <ul className="space-y-2">
              {materials.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedMaterials.map((material) => (
                <Card
                  className="bg-secondary text-secondary-foreground"
                  key={material.id}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {material.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>File: {material.file}</p>
                    <button className="mt-2 text-primary hover:underline">
                      Download
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

// export
export default MaterialsList;
