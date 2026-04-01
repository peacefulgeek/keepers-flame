import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { StartHerePage } from './pages/StartHerePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { BurnoutCheckPage } from './pages/BurnoutCheckPage';
import { QuizPage } from './pages/QuizPage';
import { ToolsPage } from './pages/ToolsPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import './styles/global.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/start-here" element={<StartHerePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/burnout-check" element={<BurnoutCheckPage />} />
        <Route path="/quiz/:quizSlug" element={<QuizPage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
