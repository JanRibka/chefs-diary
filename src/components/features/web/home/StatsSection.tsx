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
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-main mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Naše komunita roste
          </h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Připojte se k tisícům kuchařů, kteří už objevili radost z vaření s
            námi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>

                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>

                <div className="text-orange-100 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-orange-100 text-lg mb-6">
            Každý den přidáváme nové recepty a funkce pro lepší kuchařský
            zážitek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">+127</span>
              <span className="text-orange-100 ml-2">
                nových receptů tento týden
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">+89</span>
              <span className="text-orange-100 ml-2">
                nových uživatelů denně
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
