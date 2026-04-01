import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Link2, Award, Plus, Trash2, FileText, ArrowLeft, Image as ImageIcon, Download, Lock, ChevronRight, GripVertical, Eye, EyeOff, AlertTriangle, LogOut, Undo2, Redo2, X } from 'lucide-react';

export default function ResumeEditor({ template, userFullName, userEmail, onBack }) {
  const [pageSelection, setPageSelection] = useState('1'); 
  const [customPageCount, setCustomPageCount] = useState(5);
  const pageCount = pageSelection === 'custom' ? customPageCount : parseInt(pageSelection);

  const [fontSizeNum, setFontSizeNum] = useState(10); 
  const [fontFamily, setFontFamily] = useState("'Times New Roman', serif");
  const [themeColor, setThemeColor] = useState(template === '2-column' ? '#31414e' : '#f8fafc'); 
  const [themeTextColor, setThemeTextColor] = useState(template === '2-column' ? 'white' : 'black'); 
  
  const [headSizeSelection, setHeadSizeSelection] = useState('32'); 
  const [customHeadSize, setCustomHeadSize] = useState(32);
  const [headerAlignment, setHeaderAlignment] = useState('left');
  const [photoAlignment, setPhotoAlignment] = useState('left');
  const [activeSection, setActiveSection] = useState('basic-info');
  
  const activeHeadSize = headSizeSelection === 'custom' ? customHeadSize : Number(headSizeSelection);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: userFullName || 'Your Name',
    email: userEmail || 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'City, State',
  });

  const [links, setLinks] = useState([
    { id: 1, label: 'LinkedIn', url: 'linkedin.com/in/yourprofile' }
  ]);

  const [showPhoto, setShowPhoto] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  
  const [summaryContent, setSummaryContent] = useState('Passionate software engineer with 5+ years of experience building scalable web applications and intuitive user interfaces. Highly adept at independent project management, collaborating with cross-functional teams, and driving business growth through technical innovation.');

  const [sections, setSections] = useState([
    { id: 'education', title: 'Education', visible: true, column: 'left', timeline: true },
    { id: 'summary', title: 'Professional Summary', visible: true, column: 'right', timeline: false },
    { id: 'experience', title: 'Experience', visible: true, column: 'right', timeline: true },
    { id: 'projects', title: 'Projects', visible: true, column: 'right', timeline: false },
    { id: 'skills', title: 'Skills', visible: true, column: 'left', timeline: false },
    { id: 'certifications', title: 'Certifications', visible: true, column: 'left', timeline: false },
  ]);

  const [education, setEducation] = useState([
    {
      id: 1, degree: 'B.Tech in Computer Science', school: 'University Name', from: 'Aug 2023', to: 'May 2027', cgpa: '8.5 / 10'
    }
  ]);

  const [skillsFormat, setSkillsFormat] = useState('categorized');
  const [skillsContent, setSkillsContent] = useState('JavaScript, TypeScript, React, Node.js, Python, SQL');
  const [skillsData, setSkillsData] = useState([
    { id: 1, category: 'Programming', skills: 'JavaScript, TypeScript, Python, Java' },
    { id: 2, category: 'Frameworks', skills: 'React, Next.js, Node.js, Django' }
  ]);

  const [experience, setExperience] = useState([
    {
      id: 1, role: 'Senior Software Engineer', company: 'Tech Solutions Inc.', from: 'Jan 2022', to: 'Present', isBullet: true,
      description: 'Led a team of developers building scalable applications\nImproved site performance by 40% through optimization\nMentored junior engineers and established code review guidelines'
    }
  ]);

  const [projects, setProjects] = useState(() => {
    const p1 = {
      id: 1, title: 'E-commerce Platform Refactor', tech: 'React, Node.js, MongoDB', isBullet: true,
      description: 'Built a modern frontend architecture\nImplemented secure payment gateway\nReduced page load time from 4s to 1.5s'
    };
    if (template === '1-column') {
      return [p1];
    }
    return [p1, {
      id: 2, title: 'Task Management Application', tech: 'TypeScript, React, Firebase', isBullet: true,
      description: 'Built real-time task management tool\nEngineered drag-and-drop Kanban board\nSet up CI/CD deployment pipelines'
    }];
  });

  const [certifications, setCertifications] = useState([
    { id: 1, text: 'AWS Certified Solutions Architect' }
  ]);

  const [isDownloading, setIsDownloading] = useState(false);
  const previewContainerRef = useRef(null);
  const innerContentRef = useRef(null);

  const historyRef = useRef([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isRestoring = useRef(false);
  const isReadyForHistory = useRef(false);

  useEffect(() => {
    let savedStateObj = null;
    try {
      const saved = localStorage.getItem('ResumeMaker_Data');
      if (saved) savedStateObj = JSON.parse(saved);
    } catch(e) {}

    if (savedStateObj) {
       restoreState(JSON.stringify(savedStateObj));
    }
    
    const historyTimer = setTimeout(() => {
       isReadyForHistory.current = true;
    }, 800);
    return () => clearTimeout(historyTimer);
  }, [template]);

  useEffect(() => {
    if (!isReadyForHistory.current || isRestoring.current) return;
    
    const currentState = JSON.stringify({
      personalInfo, links, showPhoto, photoUrl, photoFileName, sections,
      education, experience, projects, skillsContent, skillsData, skillsFormat, certifications, summaryContent,
      pageSelection, customPageCount, fontSizeNum, fontFamily, themeColor, themeTextColor, headSizeSelection, customHeadSize, headerAlignment, photoAlignment
    });

    localStorage.setItem('ResumeMaker_Data', currentState);

    if (historyIndex >= 0 && historyRef.current[historyIndex] === currentState) {
      return;
    }

    const newHistory = historyRef.current.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    historyRef.current = newHistory;
    setHistoryIndex(newHistory.length - 1);
  }, [personalInfo, links, showPhoto, photoUrl, photoFileName, sections, education, experience, projects, skillsContent, skillsData, skillsFormat, certifications, summaryContent, pageSelection, customPageCount, fontSizeNum, fontFamily, themeColor, themeTextColor, headSizeSelection, customHeadSize, headerAlignment, photoAlignment]);

  const undo = () => {
    if (historyIndex > 0) {
      isRestoring.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreState(historyRef.current[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < historyRef.current.length - 1) {
      isRestoring.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreState(historyRef.current[newIndex]);
    }
  };

  const restoreState = (stateStr) => {
    const state = JSON.parse(stateStr);
    setPersonalInfo(state.personalInfo);
    setLinks(state.links);
    setShowPhoto(state.showPhoto);
    setPhotoUrl(state.photoUrl);
    setPhotoFileName(state.photoFileName || '');
    setSections(state.sections);
    setEducation(state.education);
    setExperience(state.experience);
    setProjects(state.projects);
    setSkillsContent(state.skillsContent);
    if(state.skillsData) setSkillsData(state.skillsData);
    if(state.skillsFormat) setSkillsFormat(state.skillsFormat);
    setCertifications(state.certifications);
    setSummaryContent(state.summaryContent);
    
    if (state.pageSelection !== undefined) setPageSelection(state.pageSelection);
    if (state.customPageCount !== undefined) setCustomPageCount(state.customPageCount);
    if (state.fontSizeNum !== undefined) setFontSizeNum(state.fontSizeNum);
    if (state.fontFamily !== undefined) setFontFamily(state.fontFamily);
    if (state.themeColor !== undefined) setThemeColor(state.themeColor);
    if (state.themeTextColor !== undefined) setThemeTextColor(state.themeTextColor);
    if (state.headSizeSelection !== undefined) setHeadSizeSelection(state.headSizeSelection);
    if (state.customHeadSize !== undefined) setCustomHeadSize(state.customHeadSize);
    if (state.headerAlignment !== undefined) setHeaderAlignment(state.headerAlignment);
    if (state.photoAlignment !== undefined) setPhotoAlignment(state.photoAlignment);
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (previewContainerRef.current && innerContentRef.current) {
        const isSpilling = innerContentRef.current.scrollHeight > (previewContainerRef.current.clientHeight + 2);
        setIsOverflowing(isSpilling);
      }
    };
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    if (innerContentRef.current) { observer.observe(innerContentRef.current); }
    return () => observer.disconnect();
  }, [personalInfo, links, education, experience, projects, skillsContent, skillsData, skillsFormat, certifications, summaryContent, template, sections, fontSizeNum, fontFamily, pageCount, showPhoto, themeColor, themeTextColor, activeHeadSize, headerAlignment, photoAlignment]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleArrayUpdate = (setter, id, field, value) => {
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const handleArrayAdd = (setter, defaultObj) => {
    setter(prev => [...prev, { id: Date.now(), ...defaultObj }]);
  };
  const handleArrayRemove = (setter, id) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  const [draggedIdx, setDraggedIdx] = useState(null);
  const handleDragStart = (e, index) => { setDraggedIdx(index); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const newSections = [...sections];
    const draggedSection = newSections[draggedIdx];
    newSections.splice(draggedIdx, 1);
    newSections.splice(index, 0, draggedSection);
    setSections(newSections);
    setDraggedIdx(null);
  };
  const toggleSectionVisibility = (id) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };
  const toggleSectionColumn = (id, col) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, column: col } : s));
  };
  const toggleSectionTimeline = (id) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, timeline: !s.timeline } : s));
  };

  const processPDFPromise = () => {
    return new Promise((resolve, reject) => {
      const element = document.getElementById('resume-preview-content');
      const clone = element.cloneNode(true);
      
      const tempWrapper = document.createElement('div');
      tempWrapper.style.position = 'absolute';
      tempWrapper.style.top = '0';
      tempWrapper.style.left = '0';
      tempWrapper.style.width = '816px'; 
      tempWrapper.style.height = `${pageCount * 1056}px`; 
      tempWrapper.style.zIndex = '-9999';
      tempWrapper.style.backgroundColor = 'white';
      
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.margin = '0';
      
      tempWrapper.appendChild(clone);
      document.body.appendChild(tempWrapper);

      const baseName = personalInfo.name ? personalInfo.name.trim().replace(/\s+/g, '_') : 'User';

      const opt = {
        margin:       0,
        filename:     `${baseName}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          width: 816, 
          height: pageCount * 1056,
          windowWidth: 816,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      window.html2pdf().set(opt).from(tempWrapper).save().then(() => {
        document.body.removeChild(tempWrapper);
        resolve();
      }).catch(err => {
        console.error(err);
        document.body.removeChild(tempWrapper);
        reject(err);
      });
    });
  };

  const generateExactPDF = async () => {
    setIsDownloading(true);
    if (window.html2pdf) {
      await processPDFPromise();
    } else {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = async () => {
          await processPDFPromise();
          resolve();
        };
        document.body.appendChild(script);
      });
    }
    setIsDownloading(false);
  };

  const sSm = { fontSize: `${Math.max(8, fontSizeNum - 2)}px` };
  const sBase = { fontSize: `${fontSizeNum}px` };
  const sLg = { fontSize: `${fontSizeNum + 2}px` };
  const sXl = { fontSize: `${fontSizeNum + 6}px` };
  const sTitle = { fontSize: `${fontSizeNum + 20}px` };

  const activeHeadSizeNum = Number(activeHeadSize);
  let picSizeValue = 125; 
  if (template === '2-column') {
    picSizeValue = Math.max(50, Math.min(180, (activeHeadSizeNum / 32) * 125));
  } else {
    picSizeValue = Math.max(50, Math.min(180, 125 + (activeHeadSizeNum * 1.3)));
  }
  const picSizeStr = `${picSizeValue}px`;

  const sectionMb = template === '1-column' ? 'mb-2' : 'mb-4';
  const titleMb = template === '1-column' ? 'mb-1.5' : 'mb-3';
  const timelineGapMb = template === '1-column' ? 'mb-2' : 'mb-3';
  const timelineGapPb = template === '1-column' ? 'pb-2' : 'pb-3';

  const getActiveStyle = (id) => {
    if (activeSection === id) {
      return { outline: '3px solid #0f172a', outlineOffset: '-3px' };
    }
    return {};
  };

  const renderDescription = (desc, isBullet, colorClass, baseSizeStyle) => {
    if (!desc) return null;
    if (isBullet !== false) {
      return (
        <ul className="list-disc pl-5 mt-1" style={{...baseSizeStyle, color: colorClass}}>
          {desc.split('\n').filter(line => line.trim()).map((line, i) => (
            <li key={i} className="mb-0.5 leading-relaxed">{line}</li>
          ))}
        </ul>
      );
    }
    return <p style={{...baseSizeStyle, color: colorClass}} className="whitespace-pre-wrap leading-relaxed mt-1">{desc}</p>;
  };

  const renderTimelineItem = (itemContent, itemId, timelineEnabled, mode, gapMb = timelineGapMb, gapPb = timelineGapPb) => {
    const borderColor = mode === 'themed' && themeTextColor === 'white' ? 'rgba(255,255,255,0.3)' : '#e2e8f0';
    const dotColor = mode === 'themed' && themeTextColor === 'white' ? 'white' : '#0f172a';

    if (timelineEnabled) {
      return (
        <div key={itemId} className={`relative pl-4 border-l ${gapPb} last:pb-0`} style={{ borderLeftColor: borderColor }}>
          <div className="absolute w-2 h-2 rounded-full -left-[4.5px] top-1.5" style={{ backgroundColor: dotColor }}></div>
          {itemContent}
        </div>
      );
    }
    return <div key={itemId} className={`${gapMb} last:mb-0`}>{itemContent}</div>;
  };

  const renderPreviewSection = (sectionId, mode = 'standard') => {
    const hColor = mode === 'themed' && themeTextColor === 'white' ? '#ffffff' : '#0f172a';
    const pColor = mode === 'themed' && themeTextColor === 'white' ? '#f1f5f9' : '#334155';
    const mColor = mode === 'themed' && themeTextColor === 'white' ? '#cbd5e1' : '#64748b';
    const borderColor = mode === 'themed' && themeTextColor === 'white' ? 'rgba(255,255,255,0.3)' : '#e2e8f0';

    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;
    const activeStyle = getActiveStyle(sectionId);

    switch(sectionId) {
      case 'summary':
        return summaryContent && (
          <section key="summary" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>Professional Summary</h2>
            {renderTimelineItem(
              <p style={{...sBase, color: pColor}} className={`whitespace-pre-wrap leading-relaxed`}>{summaryContent}</p>,
              'summary-item', section.timeline, mode, 'mb-0', 'pb-0'
            )}
          </section>
        );
      case 'education':
        return education.length > 0 && (
          <section key="education" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>Education</h2>
            <div className="space-y-0">
              {education.map(edu => renderTimelineItem(
                <div key={`edu-item-${edu.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-0.5">
                    <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{edu.school || 'University Name'}</h3>
                    {template === '1-column' && (
                      <span style={{...sSm, color: mColor}} className={`font-bold whitespace-nowrap ml-auto`}>{edu.from} - {edu.to}</span>
                    )}
                  </div>
                  {template === '2-column' ? (
                     <div style={{...sSm, color: pColor}} className={`font-medium mb-1 uppercase tracking-wide`}>{edu.degree} | <span className="font-bold">{edu.from} - {edu.to}</span></div>
                  ) : (
                     <div style={{...sBase, color: hColor}} className={`font-medium mb-1`}>{edu.degree}</div>
                  )}
                  {edu.cgpa && <div style={{...sSm, color: pColor}} className={`font-medium`}>CGPA: {edu.cgpa}</div>}
                </div>,
                edu.id, section.timeline, mode
              ))}
            </div>
          </section>
        );
      case 'experience':
        return experience.length > 0 && (
          <section key="experience" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>Experience</h2>
            <div className="space-y-0">
              {experience.map(exp => renderTimelineItem(
                <div key={`exp-item-${exp.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-0.5">
                    <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{exp.role}</h3>
                    {template === '1-column' && (
                      <span style={{...sSm, color: mColor}} className={`font-bold whitespace-nowrap ml-auto`}>{exp.from} - {exp.to}</span>
                    )}
                  </div>
                  {template === '2-column' ? (
                     <div style={{...sSm, color: pColor}} className={`font-medium mb-1 uppercase tracking-wide`}>{exp.company} | <span className="font-bold">{exp.from} - {exp.to}</span></div>
                  ) : (
                     <div style={{...sBase, color: hColor}} className={`font-medium mb-1`}>{exp.company}</div>
                  )}
                  {renderDescription(exp.description, exp.isBullet, pColor, sBase)}
                </div>,
                exp.id, section.timeline, mode
              ))}
            </div>
          </section>
        );
      case 'projects':
        return projects.length > 0 && (
          <section key="projects" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>Projects</h2>
            <div className="space-y-0">
              {projects.map(proj => renderTimelineItem(
                <div key={`proj-item-${proj.id}`} className="block">
                  <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{proj.title}</h3>
                  <div style={{...sSm, color: mColor}} className={`font-medium italic mb-1`}>{proj.tech}</div>
                  {renderDescription(proj.description, proj.isBullet, pColor, sBase)}
                </div>,
                proj.id, section.timeline, mode
              ))}
            </div>
          </section>
        );
      case 'skills':
        return (skillsFormat === 'categorized' ? skillsData.length > 0 : skillsContent) && (
          <div key="skills" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>Skills</h2>
            {renderTimelineItem(
              skillsFormat === 'categorized' ? (
                <div className="space-y-1">
                  {skillsData.map(item => item.category && item.skills && (
                    <div key={`skill-cat-${item.id}`} style={{...sBase, color: pColor}} className="leading-relaxed">
                      <span style={{color: hColor}} className="mr-1 font-bold">{item.category}:</span>
                      {item.skills}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{...sBase, color: pColor}} className={`font-medium leading-relaxed`}>{skillsContent}</div>
              ),
              'skills-list', section.timeline, mode
            )}
          </div>
        );
      case 'certifications':
        return certifications.length > 0 && (
          <div key="certifications" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold mb-2 uppercase tracking-wider border-b pb-1`}>Certifications</h2>
            <div className="space-y-0">
              {certifications.map(cert => cert.text && renderTimelineItem(
                <div key={`cert-item-${cert.id}`} style={{...sBase, color: pColor}} className="leading-relaxed">{cert.text}</div>,
                cert.id, section.timeline, mode, 'mb-1', 'pb-2'
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  const renderEditorSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Professional Summary</label>
            <textarea value={summaryContent} onChange={(e) => setSummaryContent(e.target.value)} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
                <button onClick={() => handleArrayRemove(setEducation, edu.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">School Name</label>
                    <input type="text" value={edu.school} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'school', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Degree</label>
                    <input type="text" value={edu.degree} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'degree', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                      <input type="text" value={edu.from} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'from', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                      <input type="text" value={edu.to} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'to', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">CGPA</label>
                    <input type="text" value={edu.cgpa} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'cgpa', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setEducation, { degree: '', school: '', from: '', to: '', cgpa: '' })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Education
            </button>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
                <button onClick={() => handleArrayRemove(setExperience, exp.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                    <input type="text" value={exp.role} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'role', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                    <input type="text" value={exp.company} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'company', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                      <input type="text" value={exp.from} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'from', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                      <input type="text" value={exp.to} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'to', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea value={exp.description} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'description', e.target.value)} rows={2} placeholder="Use new lines for bullet points" className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setExperience, { role: '', company: '', from: '', to: '', description: '', isBullet: true })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Experience
            </button>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
                <button onClick={() => handleArrayRemove(setProjects, proj.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Project Title</label>
                    <input type="text" value={proj.title} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Technologies</label>
                    <input type="text" value={proj.tech} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'tech', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea value={proj.description} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'description', e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setProjects, { title: '', tech: '', description: '', isBullet: true })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Project
            </button>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-600">Skills Format:</label>
              <select value={skillsFormat} onChange={(e) => setSkillsFormat(e.target.value)} className="p-1 border border-slate-300 rounded text-xs outline-none">
                <option value="categorized">Categorized</option>
                <option value="simple">Simple List</option>
              </select>
            </div>
            
            {skillsFormat === 'categorized' ? (
              <div className="space-y-3">
                {skillsData.map(item => (
                  <div key={item.id} className="p-3 bg-white border border-gray-200 rounded relative group">
                    <button onClick={() => handleArrayRemove(setSkillsData, item.id)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium text-gray-600">Category</label>
                        <input type="text" value={item.category} onChange={(e) => handleArrayUpdate(setSkillsData, item.id, 'category', e.target.value)} className="w-full p-1 text-sm border border-gray-300 rounded outline-none" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Skills</label>
                        <input type="text" value={item.skills} onChange={(e) => handleArrayUpdate(setSkillsData, item.id, 'skills', e.target.value)} className="w-full p-1 text-sm border border-gray-300 rounded outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => handleArrayAdd(setSkillsData, { category: '', skills: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  <Plus size={14} /> Add Category
                </button>
              </div>
            ) : (
              <textarea value={skillsContent} onChange={(e) => setSkillsContent(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded outline-none" />
            )}
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex gap-2 items-center">
                <input type="text" value={cert.text} onChange={(e) => handleArrayUpdate(setCertifications, cert.id, 'text', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded outline-none" />
                <button onClick={() => handleArrayRemove(setCertifications, cert.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setCertifications, { text: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1">
              <Plus size={14} /> Add Certification
            </button>
          </div>
        );
      default: return null;
    }
  };

  const headHColor = themeTextColor === 'white' ? '#ffffff' : '#0f172a';
  const headPColor = themeTextColor === 'white' ? '#f1f5f9' : '#334155';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-gray-100 font-sans overflow-auto lg:overflow-hidden text-gray-800">
      
      {/* LEFT PANEL */}
      <div className="w-full lg:w-[45%] h-auto lg:h-screen overflow-y-auto bg-slate-50 border-b lg:border-b-0 lg:border-r border-gray-200 shadow-lg z-10 flex-shrink-0">
        <div className="p-6 bg-slate-800 text-white sticky top-0 z-20 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <FileText size={24} className="text-blue-400" />
            <h1 className="text-xl font-bold">ResumeMaker</h1>
          </div>
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-300 hover:text-white">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-6">
          {/* Basic Information */}
          <section 
            className={`bg-white p-5 rounded-lg border ${activeSection === 'basic-info' ? 'border-slate-800 ring-1 ring-slate-800' : 'border-gray-200'}`}
            onClickCapture={() => setActiveSection('basic-info')}
          >
            <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-3 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded outline-none" />
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer mb-3">
                <input type="checkbox" checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} className="w-4 h-4" />
                Include Profile Photo
              </label>
              {showPhoto && (
                <div>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm" />
                  {photoFileName && <p className="text-xs text-gray-600 mt-1">{photoFileName}</p>}
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Links</label>
              <div className="space-y-2">
                {links.map(link => (
                  <div key={link.id} className="flex gap-2">
                    <input type="text" value={link.label} onChange={(e) => handleArrayUpdate(setLinks, link.id, 'label', e.target.value)} placeholder="Label" className="flex-1 p-1 text-sm border border-gray-300 rounded outline-none" />
                    <input type="text" value={link.url} onChange={(e) => handleArrayUpdate(setLinks, link.id, 'url', e.target.value)} placeholder="URL" className="flex-1 p-1 text-sm border border-gray-300 rounded outline-none" />
                    <button onClick={() => handleArrayRemove(setLinks, link.id)} className="text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
                <button onClick={() => handleArrayAdd(setLinks, { label: '', url: '' })} className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  <Plus size={14} /> Add Link
                </button>
              </div>
            </div>
          </section>

          {/* Sections Manager */}
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                className={`bg-white rounded-lg border ${activeSection === section.id ? 'border-slate-800 ring-1 ring-slate-800' : (section.visible ? 'border-blue-200' : 'border-gray-200 opacity-60')}`}
                onClickCapture={() => setActiveSection(section.id)}
              >
                <div draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} className={`p-3 flex gap-2 items-center justify-between border-b cursor-grab ${section.visible ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <GripVertical size={18} className="text-slate-400" />
                    <h2 className="font-bold text-slate-800">{section.title}</h2>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {template === '2-column' && (
                      <div className="flex bg-slate-200 rounded p-0.5 mr-1">
                        <button onClick={() => toggleSectionColumn(section.id, 'left')} className={`text-[10px] px-2 py-1 rounded-sm ${section.column === 'left' ? 'bg-white font-bold text-blue-600' : 'text-slate-500'}`}>L</button>
                        <button onClick={() => toggleSectionColumn(section.id, 'right')} className={`text-[10px] px-2 py-1 rounded-sm ${section.column === 'right' ? 'bg-white font-bold text-blue-600' : 'text-slate-500'}`}>R</button>
                      </div>
                    )}
                    <button onClick={() => toggleSectionTimeline(section.id)} className={`text-[10px] px-2 py-1 rounded-sm ${section.timeline ? 'bg-white font-bold text-blue-600' : 'text-slate-500'}`}>Line</button>
                    <button onClick={() => toggleSectionVisibility(section.id)} className={`p-1.5 rounded ${section.visible ? 'text-blue-600 hover:bg-blue-100' : 'text-gray-500'}`}>
                      {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>
                
                {section.visible && (
                  <div className="p-4 bg-slate-50">
                    {renderEditorSection(section.id)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[55%] h-auto lg:h-screen overflow-y-auto bg-gray-200 p-4 lg:p-8 flex flex-col items-center">
        
        <div className="w-full max-w-[816px] flex flex-col gap-4 pb-12">
          
          {isOverflowing && (
             <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
               <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={20} />
               <p className="text-red-700 text-sm">Content exceeds page limits. Reduce font size or remove content.</p>
             </div>
          )}

          {/* Action Bar */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            
            {historyRef.current.length > 1 && (
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <button onClick={undo} disabled={historyIndex <= 0} className="p-2 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50">
                   <Undo2 size={18} />
                </button>
                <button onClick={redo} disabled={historyIndex >= historyRef.current.length - 1} className="p-2 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50">
                   <Redo2 size={18} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-500 mb-2">Head Size</label>
                <select value={headSizeSelection} onChange={(e) => setHeadSizeSelection(e.target.value)} className="w-full h-8 border border-slate-300 rounded text-xs outline-none">
                  <option value="0">None</option>
                  <option value="32">Normal</option>
                  <option value="40">Large</option>
                </select>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-500 mb-2">Font Size</label>
                <input type="number" min="8" max="16" value={fontSizeNum} onChange={(e) => setFontSizeNum(Number(e.target.value))} className="w-full h-8 border border-slate-300 rounded text-xs text-center outline-none" />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-500 mb-2">Theme Color</label>
                <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-full h-8 rounded cursor-pointer border-0 p-0" />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-xs font-bold text-slate-500 mb-2">Pages</label>
                <select value={pageSelection} onChange={(e) => setPageSelection(e.target.value)} className="w-full h-8 border border-slate-300 rounded text-xs outline-none">
                  <option value="1">1 Page</option>
                  <option value="2">2 Pages</option>
                  <option value="3">3 Pages</option>
                </select>
              </div>
            </div>

            <button 
              onClick={generateExactPDF} 
              disabled={isDownloading}
              className="w-full py-3 bg-yellow-400 text-yellow-900 rounded-lg font-extrabold hover:bg-yellow-500 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <Download size={20} /> {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>

          {/* Preview */}
          <div className="w-full overflow-x-auto text-center pb-12">
            
            <div 
              ref={previewContainerRef}
              className="inline-block text-left shadow-2xl bg-white" 
              style={{ width: '816px', height: `${pageCount * 1056}px` }}
            >
              
              <div 
                id="resume-preview-content" 
                ref={innerContentRef}
                className="w-full bg-white flex flex-col"
                style={{ minHeight: '100%', fontFamily: fontFamily, color: '#0f172a' }}
              >
                
                {template === '1-column' && (
                  <div className="flex flex-col flex-1 h-full">
                    <div 
                      className="flex flex-col items-center gap-4 px-10 py-6"
                      style={{ backgroundColor: themeColor, paddingTop: `${activeHeadSize}px`, paddingBottom: `${activeHeadSize}px` }}
                    >
                      {showPhoto && photoUrl && (
                        <img src={photoUrl} alt="Profile" style={{ width: picSizeStr, height: picSizeStr }} className="rounded-full object-cover border-4 border-slate-100" />
                      )}
                      <div className="text-center">
                        <h1 style={{...sTitle, color: headHColor}} className="font-bold mb-2">{personalInfo.name}</h1>
                        <div style={{...sSm, color: headPColor}} className="flex flex-wrap justify-center gap-4">
                          {personalInfo.email && <span>{personalInfo.email}</span>}
                          {personalInfo.phone && <span>{personalInfo.phone}</span>}
                          {personalInfo.location && <span>{personalInfo.location}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="px-10 pb-10">
                      {sections.filter(s => s.visible).map(section => renderPreviewSection(section.id, 'standard'))}
                    </div>
                  </div>
                )}

                {template === '2-column' && (
                  <div className="flex flex-row flex-1 items-stretch w-full h-full">
                    
                    <div 
                      className="p-8 flex flex-col min-h-full"
                      style={{ backgroundColor: themeColor, width: `${activeHeadSize}%` }}
                    >
                      
                      {showPhoto && photoUrl && (
                        <img src={photoUrl} alt="Profile" style={{ width: picSizeStr, height: picSizeStr }} className="rounded-full object-cover border-4 border-white mb-4" />
                      )}

                      <div className="mb-4">
                        <h1 style={{...sTitle, color: headHColor}} className="font-bold break-words">{personalInfo.name}</h1>
                      </div>

                      <div className="space-y-2 mb-6">
                        {personalInfo.email && <p style={{...sSm, color: headPColor}}>{personalInfo.email}</p>}
                        {personalInfo.phone && <p style={{...sSm, color: headPColor}}>{personalInfo.phone}</p>}
                        {personalInfo.location && <p style={{...sSm, color: headPColor}}>{personalInfo.location}</p>}
                      </div>

                      {sections.filter(s => s.visible && s.column === 'left').map(section => renderPreviewSection(section.id, 'themed'))}
                    </div>

                    <div className="p-8 flex flex-col bg-white h-full w-full">
                      {sections.filter(s => s.visible && s.column === 'right').map(section => renderPreviewSection(section.id, 'standard'))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
