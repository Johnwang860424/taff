const SocialLinks = ({ showLine = true }: { showLine?: boolean }) => {
  return (
    <>
      <a href="https://www.instagram.com/taff__dessert/" target="_blank" rel="noreferrer" className="hover:text-primary transition-all duration-300 hover:scale-110" aria-label="Instagram">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      
      {showLine && <span className="h-px w-10 bg-primary/20 origin-left line-animation"></span>}
      
      <a href="https://www.facebook.com/p/%E5%A1%94%E8%8A%99-TAFF-100083549960649/" target="_blank" rel="noreferrer" className="hover:text-primary transition-all duration-300 hover:scale-110" aria-label="Facebook">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      
      {showLine && <span className="h-px w-10 bg-primary/20 origin-left line-animation"></span>}
      
      <a href="https://linktr.ee/taff_dessert" target="_blank" rel="noreferrer" className="hover:text-primary transition-all duration-300 hover:scale-110" aria-label="Linktree">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.73635 5.85251 L17.74102 1.73586 L20.06582 4.11666 L15.86518 8.12132 H21.77368 V11.42605 H15.83718 L20.06583 15.53371 L17.74103 17.86751 L12.0005 12.099 L6.25998 17.86752 L3.93518 15.54272 L8.16382 11.43506 H2.22632 V8.12132 H8.13482 L3.93418 4.11666 L6.25898 1.73586 L10.26366 5.85251 V0 H13.73635 Z M10.26365 16.15865 H13.73635 V24 H10.26365 Z" />
        </svg>
      </a>
    </>
  );
};

export default SocialLinks;