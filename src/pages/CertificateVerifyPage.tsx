import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Certificate } from '../types';
import { 
  Award, 
  ShieldCheck, 
  Calendar, 
  User, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Printer,
  GraduationCap
} from 'lucide-react';

export const CertificateVerifyPage: React.FC = () => {
  const { certificateNumber } = useParams<{ certificateNumber: string }>();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!certificateNumber) return;
      try {
        const data = await api.certificates.verify(certificateNumber);
        setCert(data);
      } catch (err: any) {
        setError(err.message || 'Certificat invalide ou introuvable');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [certificateNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-primary text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil FormaSEO</span>
          </Link>

          {cert && (
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 text-brand-primary" />
              <span>Imprimer / PDF</span>
            </button>
          )}
        </div>

        {error || !cert ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center shadow-lg">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-2">Vérification Échouée</h1>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Le numéro de certificat <code className="bg-slate-100 px-2 py-0.5 rounded text-red-600 font-mono font-bold">{certificateNumber}</code> ne correspond à aucun document authentifié dans les registres académiques de FormaSEO.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-sm font-bold rounded-xl"
            >
              Consulter nos formations certifiées
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-8 border-slate-200 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Top Seal Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b-2 border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-brand-accent shadow-md">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xl font-black text-brand-primary tracking-tight">
                    Forma<span className="text-brand-accent">SEO</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                    Académie d'Excellence Digitale — Casablanca
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-bold border border-green-200 self-start sm:self-center">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Certificat Officiel Vérifié</span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="py-12 text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Certificat de Réussite & d'Aptitude Professionnelle
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Ce document officiel atteste que
              </p>

              <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight mb-4 font-serif">
                {cert.userName}
              </h2>

              <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
                a suivi avec succès l'ensemble du cursus théorique, les études de cas réels et les évaluations pratiques de la formation intensive :
              </p>

              <div className="inline-block bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl shadow-inner mb-6">
                <div className="text-lg sm:text-xl font-black text-brand-primary">
                  {cert.courseTitle}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  Délivré à Casablanca le {new Date(cert.issuedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Certificate Footer / Signature & Verification Key */}
            <div className="pt-8 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Identifiant Unique</div>
                <div className="font-mono font-bold text-slate-800 text-sm mt-0.5">{cert.certificateNumber}</div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Token : <span className="font-mono text-slate-500">{cert.verificationToken}</span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-xs font-black text-brand-primary">Le Comité Pédagogique FormaSEO</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Direction des Formations & Audits SEO</div>
                <div className="mt-2 text-[10px] text-green-600 font-bold flex items-center justify-center sm:justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Signature numérique enregistrée
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
