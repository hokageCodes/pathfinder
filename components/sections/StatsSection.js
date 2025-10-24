import { Users, Clock, Award, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of people who have discovered their perfect tech career path
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <p className="text-gray-600">People Helped</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-secondary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">5 Min</div>
            <p className="text-gray-600">Average Time</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-accent-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">12+</div>
            <p className="text-gray-600">Career Paths</p>
          </div>
        </div>
      </div>
    </section>
  );
}
