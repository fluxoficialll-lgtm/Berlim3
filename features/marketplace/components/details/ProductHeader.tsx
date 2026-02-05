
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductHeaderProps {
  isSeller: boolean;
  productId: string;
  onDelete: () => void;
  onReport: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ isSeller, productId, onDelete, onReport }) => {
  const navigate = useNavigate();
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOptionsOpen && !(event.target as HTMLElement).closest('.header-btn, .options-menu')) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOptionsOpen]);

  return (
    <>
      <header className="floating-header">
        <button onClick={() => navigate(-1)} className="header-btn" aria-label="Voltar">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button onClick={(e) => { e.stopPropagation(); setIsOptionsOpen(!isOptionsOpen); }} className="header-btn" aria-label="Mais opções">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </header>

      {isOptionsOpen && (
        <div className="options-menu">
          {isSeller ? (
            <>
              <button onClick={() => { setIsOptionsOpen(false); navigate(`/marketplace/edit/${productId}`); }} className="options-menu-item">
                <i className="fa-solid fa-pencil"></i> Editar Anúncio
              </button>
              <button onClick={onDelete} className="options-menu-item danger">
                <i className="fa-solid fa-trash-can"></i> Excluir
              </button>
            </>
          ) : (
            <button onClick={onReport} className="options-menu-item">
              <i className="fa-solid fa-flag"></i> Reportar
            </button>
          )}
        </div>
      )}
    </>
  );
};
