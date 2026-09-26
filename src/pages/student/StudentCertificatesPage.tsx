import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Certificate } from '../../types';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  FileCheck 
} from 'lucide-react';

export const StudentCertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await api.student.getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Top Header */}
      <div className="bg-brand-primary text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-brand-accent text-sm font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tableau de bord</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 flex items-center justify-center text-brand-accent border border-brand-accent/30">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Mes Certifications Officielles
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                Certificats de réussite vérifiables attestant de vos compétences acquises chez FormaSEO.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {certificates.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-brand-accent mx-auto mb-4 border border-amber-100">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Aucun certificat délivré pour l'instant</h3>
            <p className="text-sm text-slate-600 mb-6">
              Complétez 100% des modules et ateliers pratiques d'une formation pour débloquer votre certificat nominatif avec identifiant de vérification unique.
            </p>
            <Link
              to="/student/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold text-sm rounded-xl hover:bg-brand-primary-light transition-all shadow-md"
            >
              <span>Continuer mes cours</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border-2 border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decorative background watermark */}
                <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-5 pointer-events-none">
                  <Award className="w-48 h-48 text-brand-primary" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      Certifié & Vérifié
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      N° {cert.certificateNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-brand-primary">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Délivré à <strong className="text-slate-800">{cert.userName}</strong>
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 font-medium">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Émis le {new Date(cert.issuedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to={`/certificates/${cert.certificateNumber}`}
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Page de vérification</span>
                  </Link>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="Imprimer / Télécharger PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
