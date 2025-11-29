import { IoDocumentText, IoHeart, IoPeople, IoStar } from "react-icons/io5";

const stats = [
  {
    id: 1,
    label: "Aktivních uživatelů",
    value: "12,847",
    icon: IoPeople,
    color: "text-blue-500",
  },
  {
    id: 2,
    label: "Receptů v databázi",
    value: "3,429",
    icon: IoDocumentText,
    color: "text-green-500",
  },
  {
    id: 3,
    label: "Oblíbených receptů",
    value: "89,234",
    icon: IoHeart,
    color: "text-red-500",
  },
  {
    id: 4,
    label: "Průměrné hodnocení",
    value: "4.8/5",
    icon: IoStar,
    color: "text-yellow-500",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-orange-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center group">
                <div className="mb-4 p-4 rounded-2xl bg-white/20 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white/80 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
