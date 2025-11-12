import logoUrl from '../assets/images/mylogo.svg'
import BubbleMenu from './bits/BubbleMenu.jsx'

function Header() {
  const items = [
    {
      label: 'about',
      href: '#about',
      ariaLabel: 'About',
      rotation: 8,
      hoverStyles: { bgColor: '68.53.146.25', textColor: '#ffffff' }, // Pink
    },
    {
      label: 'projects',
      href: '#projects',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#DE9600', textColor: '#ffffff' }, // Yellow
    },
    {
      label: 'skills',
      href: '#skills',
      ariaLabel: 'skills',
      rotation: -8,
      hoverStyles: { bgColor: '#D99BA4', textColor: '#ffffff' }, // Purple
    },
    {
      label: 'achievements',
      href: '#achievements',
      ariaLabel: 'Achievements',
      rotation: 8,
      hoverStyles: { bgColor: '#D99BA4', textColor: '#ffffff' }, // Light Blue
    },
    {
      label: 'contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '68.53.146.25', textColor: '#ffffff' }, // Pink
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-canvas/80 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 select-none">
          <img
            src={logoUrl}
            alt="Shahad Aljohani logo"
            className="h-14 md:h-16 w-auto"
          />
        </a>

        {/* Bubble Menu */}
        <BubbleMenu
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#4C2A9A"
          menuContentColor="#ffffff"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={1.1}
          staggerDelay={0.25}
        />
      </div>
    </header>
  );
}

export default Header;
