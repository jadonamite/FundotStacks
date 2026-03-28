/**
 * Main App Component
 * Root component with routing and providers
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';
import { ConnectButton } from './components/wallet/ConnectButton.jsx';
import { Home } from './pages/Home.jsx';
import { ExploreCampaigns } from './pages/ExploreCampaigns.jsx';
import { CreateCampaign } from './pages/CreateCampaign.jsx';
import { CampaignDetail } from './pages/CampaignDetail.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Profile } from './pages/Profile.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useState } from 'react';
import './styles/globals.css';

// Initialize Reown AppKit for Bitcoin wallet support
import './config/reown.js';

const queryClient = new QueryClient();

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focusable inline-block bg-primary-500 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:translate-y-0">
              Skip to main content
            </a>
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-secondary-950/80 backdrop-blur-lg border-b border-secondary-200 dark:border-secondary-800">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                  {/* Logo */}
                  <Link to="/" className="flex items-center gap-3 group">
                    <img
                      src="/logo.png"
                      alt="FundotStacks"
                      className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-110"
                    />
                    <div className="hidden sm:flex flex-col leading-tight">
                      <span className="text-xl md:text-2xl font-bold text-gradient">
                        FundotStacks
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
                        v1 no-custody
                      </span>
                    </div>
                  </Link>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center gap-8">
                    <Link
                      to="/explore"
                      className="font-semibold text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      Explore
                    </Link>
                    <Link
                      to="/create"
                      className="font-semibold text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      Create
                    </Link>
                    <Link
                      to="/dashboard"
                      className="font-semibold text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-xl bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                      aria-label="Toggle theme"
                    >
                      {isDark ? (
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                    </button>

                    {/* Connect Button */}
                    <ConnectButton />
                    <button
                      type="button"
                      onClick={() => setMobileNavOpen(true)}
                      className="md:hidden p-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                      aria-label="Open navigation menu"
                    >
                      <span className="sr-only">Open navigation menu</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden border-t border-secondary-200 dark:border-secondary-800">
                <div className="container mx-auto px-4 py-3 flex justify-around">
                  <Link
                    to="/explore"
                    className="font-semibold text-sm text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    Explore
                  </Link>
                  <Link
                    to="/create"
                    className="font-semibold text-sm text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    Create
                  </Link>
                  <Link
                    to="/dashboard"
                    className="font-semibold text-sm text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              {mobileNavOpen && (
                <div className="fixed inset-0 z-50">
                  <div
                    className="absolute inset-0 bg-black/30"
                    aria-hidden="true"
                    onClick={closeMobileNav}
                  />
                  <div className="relative bg-white dark:bg-secondary-900 h-full w-full p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <Link to="/" className="flex items-center gap-3" onClick={closeMobileNav}>
                        <img
                          src="/logo.png"
                          alt="FundotStacks"
                          className="w-10 h-10 object-contain"
                        />
                        <div className="flex flex-col leading-tight">
                          <span className="text-lg font-bold text-gradient">FundotStacks</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-500 dark:text-secondary-400">
                            v1 no-custody
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={closeMobileNav}
                        className="p-2 rounded-full bg-secondary-200 dark:bg-secondary-800"
                        aria-label="Close navigation"
                      >
                        ✕
                      </button>
                    </div>
                    <nav className="space-y-4 text-lg text-secondary-700 dark:text-secondary-300">
                      <Link to="/explore" onClick={closeMobileNav} className="block font-semibold">
                        Explore
                      </Link>
                      <Link to="/create" onClick={closeMobileNav} className="block font-semibold">
                        Create
                      </Link>
                      <Link to="/dashboard" onClick={closeMobileNav} className="block font-semibold">
                        Dashboard
                      </Link>
                    </nav>
                    <div className="mt-8 space-y-3">
                      <button
                        onClick={() => {
                          toggleTheme();
                        }}
                        className="w-full btn btn-outline"
                      >
                        Toggle Theme
                      </button>
                      <ConnectButton />
                    </div>
                  </div>
                </div>
              )}
            </nav>

            {/* Main Content */}
            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<ExploreCampaigns />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route path="/campaign/:id" element={<CampaignDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile/:address" element={<Profile />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 py-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="/logo.png"
                        alt="FundotStacks"
                        className="w-10 h-10 object-contain"
                      />
                      <div className="flex flex-col leading-tight">
                        <span className="text-xl font-bold text-gradient">FundotStacks</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-secondary-500 dark:text-secondary-400">
                          v1 no-custody
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Direct-to-creator crowdfunding on Stacks with on-chain campaign tracking for FundotStacks v1.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link to="/explore" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500">Explore Campaigns</Link></li>
                      <li><Link to="/create" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500">Create Campaign</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500">Documentation</a></li>
                      <li><a href="#" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500">Smart Contracts</a></li>
                      <li><a href="https://www.stacks.co" target="_blank" rel="noopener noreferrer" className="text-secondary-600 dark:text-secondary-400 hover:text-primary-500">Powered by Stacks</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-800 text-center text-sm text-secondary-600 dark:text-secondary-400">
                  © 2026 FundotStacks. Built on Stacks, secured by Bitcoin.
                </div>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
