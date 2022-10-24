export const getAllFocusableElements = (parent: HTMLElement): HTMLElement[] => {
  if (!parent) {
    return [];
  }

  return Array.from(
    parent.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
    )
  );
};
