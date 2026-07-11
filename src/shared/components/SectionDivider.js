import './sectionDivider.css';
import frameSvg from '../../assets/Frame.svg';

export function SectionDivider({ inverted = false } = {}) {
  const invertedClass = inverted ? 'section-divider--inverted' : '';
  return `
    <div class="section-divider ${invertedClass}">
      <img src="${frameSvg}" alt="" aria-hidden="true" />
    </div>
  `;
}
