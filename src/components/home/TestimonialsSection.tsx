import React from 'react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';
import { Review } from '../../types';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Témoignages & Réussites
          </span>
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Ce que disent nos étudiants & alumni
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2">
          Des résultats mesurables : du trafic organique multiplié, des recrutements réussis et des positions n°1 sur Google.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#F5B716]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-200" />
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
              <img
                src={rev.userAvatar}
                alt={rev.userName}
                className="w-11 h-11 rounded-full object-cover border-2 border-yellow-300 shadow-sm"
              />
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  {rev.userName}
                  <CheckCircle className="w-3.5 h-3.5 text-sky-500" />
                </h4>
                <p className="text-xs text-slate-500">{rev.userRole}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
