import { useCallback, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useRouter } from '@/hooks/useRouter';
import { useProjects } from '@/hooks/useProjects';
import { Background } from '@/components/layout/Background';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { Contact } from '@/components/sections/Contact';
import { ProjectDetail } from '@/components/sections/ProjectDetail';
import { NotFound } from '@/components/NotFound';
import { AuthProvider, useAuth } from '@/admin/AuthContext';
import { AdminLogin } from '@/admin/AdminLogin';
import { AdminDashboard } from '@/admin/AdminDashboard';

function isProjectSlug(path: string): boolean {
  return path.startsWith('/project/');
}

function isAdmin(path: string): boolean {
  return path === '/admin' || path.startsWith('/admin/');
}

function AdminRoute({ onHome }: { onHome: () => void }) {
  const { isAuthed, loading } = useAuth();
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </main>
    );
  }
  return (
    <>
      <Background />
      <main>{isAuthed ? <AdminDashboard /> : <AdminLogin onBack={onHome} />}</main>
    </>
  );
}

export default function App() {
  const { lang } = useLanguage();
  const { path, navigate } = useRouter();
  const { projects, status, reload } = useProjects();

  const goHome = useCallback(() => navigate('/'), [navigate]);
  const goToSection = useCallback(
    (id: string) => {
      if (path !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [navigate, path],
  );
  const openProject = useCallback((slug: string) => navigate(`/project/${slug}`), [navigate]);

  // Update document title + meta description for the active language.
  useEffect(() => {
    const titleEn = 'František Lachman • Web Developer & AI Builder';
    const titleCs = 'František Lachman • Webový vývojář & tvůrce AI';
    const descEn =
      'František Lachman — Web Developer, AI Builder and Creative Technologist. I design and build modern websites, digital experiences and AI-powered products.';
    const descCs =
      'František Lachman — webový vývojář, tvůrce AI a kreativní technolog. Navrhuji a stavím moderní weby, digitální zážitky a produkty s umělou inteligencí.';

    document.title = lang === 'cs' ? titleCs : titleEn;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', lang === 'cs' ? descCs : descEn);
  }, [lang]);

  // Admin route
  if (isAdmin(path)) {
    return (
      <AuthProvider>
        <AdminRoute onHome={goHome} />
      </AuthProvider>
    );
  }

  // Project detail route
  if (isProjectSlug(path)) {
    const slug = path.replace('/project/', '');
    if (slug) {
      return (
        <>
          <Background />
          <Navbar onSection={goToSection} onHome={goHome} />
          <main>
            <ProjectDetail slug={slug} onBack={() => goToSection('work')} />
          </main>
          <Footer onSection={goToSection} onHome={goHome} />
        </>
      );
    }
  }

  // Unknown route → 404
  if (path !== '/') {
    return (
      <>
        <Background />
        <Navbar onSection={goToSection} onHome={goHome} />
        <main>
          <NotFound onHome={goHome} />
        </main>
      </>
    );
  }

  // Home
  return (
    <>
      <Background />
      <Navbar onSection={goToSection} onHome={goHome} />
      <main>
        <Hero onSection={goToSection} />
        <About />
        <Services />
        <Work projects={projects} status={status} onReload={reload} onOpen={openProject} />
        <Contact />
      </main>
      <Footer onSection={goToSection} onHome={goHome} />
    </>
  );
}


