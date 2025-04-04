// internal import
import NoteItem from "../components/shared/NoteItem";

const courses = [
  {
    subjectName: "Introduction to Computer Science",
    subjectImg: "https://source.unsplash.com/400x300/?technology,computer",
    modeleDesc:
      "A foundational course covering algorithms, data structures, and programming basics.",
    teacherBy: "Dr. John Smith",
  },
  {
    subjectName: "Web Development",
    subjectImg: "https://source.unsplash.com/400x300/?coding,web",
    modeleDesc:
      "Learn HTML, CSS, JavaScript, and modern frameworks to build responsive web applications.",
    teacherBy: "Prof. Emily Johnson",
  },
  {
    subjectName: "Machine Learning Basics",
    subjectImg: "https://source.unsplash.com/400x300/?ai,robot",
    modeleDesc:
      "Explore the fundamentals of ML, including supervised and unsupervised learning techniques.",
    teacherBy: "Dr. Alan Turing",
  },
  {
    subjectName: "Database Management Systems",
    subjectImg: "https://source.unsplash.com/400x300/?database,server",
    modeleDesc:
      "Understand SQL, NoSQL, and database optimization techniques for real-world applications.",
    teacherBy: "Prof. Maria Gonzalez",
  },
  {
    subjectName: "Cybersecurity Fundamentals",
    subjectImg: "https://source.unsplash.com/400x300/?cybersecurity,hacking",
    modeleDesc:
      "Learn about network security, encryption, and ethical hacking to protect digital assets.",
    teacherBy: "Dr. Kevin Mitnick",
  },
];

const Notes = () => {
  return (
    <div className=" pt-6 px-2">
      <div className="grid grid-cols-3   gap-4">
        {courses.map((item) => (
          <NoteItem
            subjectName={item.subjectName}
            subjectImg={item.subjectImg}
            teacherBy={item.teacherBy}
            modeleDesc={item.modeleDesc}
            key={item.subjectName}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
