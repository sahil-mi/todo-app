import SideNavbar from "./components/SideNavbar";
import TaskCard from "./components/TaskCard";

export default function Home() {
  return (
    <main>
      <section>
        <div className="flex justify-between">
          {/* navbar */}
          <SideNavbar />
          {/* home page */}
          <TaskCard />
        </div>
      </section>
    </main>
  );
}
