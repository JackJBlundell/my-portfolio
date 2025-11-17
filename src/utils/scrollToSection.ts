/**
 * Scrolls to a section by ID with smooth behavior
 * @param sectionId - The ID of the section to scroll to (without the # symbol)
 * @param offset - Optional offset from the top (e.g., for fixed navbar height)
 */
export const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Scrolls to section based on hash in URL
 * @param hash - The hash from URL (e.g., "#contact")
 * @param offset - Optional offset from the top
 */
export const scrollToHash = (hash: string, offset: number = 80) => {
  if (!hash) return;

  const sectionId = hash.replace('#', '');
  scrollToSection(sectionId, offset);
};
