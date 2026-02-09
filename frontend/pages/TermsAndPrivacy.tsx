
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { termsAndPrivacyContent } from '../shared/constants/TermsAndPrivacy';

export const TermsAndPrivacy: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  const handleBack = () => {
      if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
      } else {
          navigate('/settings');
      }
  };

  const renderContent = (content: typeof termsAndPrivacyContent.terms) => {
    return content.sections.map((section, index) => (
      <React.Fragment key={index}>
        <h2>{section.title}</h2>
        <p>{section.content}</p>
        {section.list && (
          <ul>
            {section.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </React.Fragment>
    ));
  }

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter', sans-serif; }
        header {
            display:flex; align-items:center; padding:16px;
            background: #0c0f14; position:fixed; width:100%; top:0; z-index:10;
            border-bottom:1px solid rgba(255,255,255,0.1); height: 65px;
        }
        header .back-btn {
            background:none; border:none; color:#fff; font-size:24px; cursor:pointer; padding-right: 15px;
        }
        header h1 { font-size:20px; font-weight:600; }
        
        main { 
            padding-top: 85px; padding-bottom: 40px; width: 100%; max-width: 800px; 
            margin: 0 auto; padding-left: 20px; padding-right: 20px;
            overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch;
        }

        .tabs {
            display: flex; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px;
            margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);
        }
        .tab-btn {
            flex: 1; padding: 12px; border: none; background: transparent; color: #aaa;
            font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 8px; transition: 0.3s;
        }
        .tab-btn.active {
            background: #00c2ff; color: #000; box-shadow: 0 2px 10px rgba(0,194,255,0.3);
        }

        .content-box {
            background: rgba(255,255,255,0.05); border-radius: 12px; padding: 25px;
            border: 1px solid rgba(255,255,255,0.05); line-height: 1.6; color: rgba(255,255,255,0.8);
            font-size: 15px; text-align: justify;
        }
        
        h2 { color: #00c2ff; font-size: 18px; margin-top: 20px; margin-bottom: 10px; font-weight: 700; }
        h2:first-child { margin-top: 0; }
        p { margin-bottom: 15px; }
        ul { list-style-type: disc; padding-left: 20px; margin-bottom: 15px; }
        li { margin-bottom: 8px; }
      `}</style>

      <header>
        <button onClick={handleBack} className="back-btn"><i className="fa-solid fa-arrow-left"></i></button>
        <h1>Termos e Privacidade</h1>
      </header>

      <main>
        <div className="tabs">
            <button className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>{termsAndPrivacyContent.terms.title}</button>
            <button className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`} onClick={() => setActiveTab('privacy')}>{termsAndPrivacyContent.privacy.title}</button>
        </div>

        <div className="content-box">
            {activeTab === 'terms' ? renderContent(termsAndPrivacyContent.terms) : renderContent(termsAndPrivacyContent.privacy)}
        </div>
      </main>
    </div>
  );
};
