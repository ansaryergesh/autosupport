import CategoryCreateModal from '../../components/CategoryItem/CategoryViewEditModal/CategoryCreateModal.jsx';
import CategoryEditModal from '../../components/CategoryItem/CategoryViewEditModal/CategoryEditModal.jsx';
import QuestionCreateModal from '../../components/Question/QuestionEditCreate/QuestionCreateModal.jsx';
import CategoryOrderEditModal from '../../components/CategoryItem/CategoryViewEditModal/CategoryOrderEditModal.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import QuestionEditModal from '../../components/Question/QuestionEditCreate/QuestionEditModal.jsx';

const ActionsSideBarModals = ({
  categoryModal,
  setCategoryModal,
  categoryEditModal,
  setCategoryEditModal,
  questionModal,
  setQuestionModal,
  orderModal,
  setOrderModal,
  categoryId,
  categoryInfo,
  questionInfo,
  questionEditModal,
  setQuestionEditModal,
  getCategoryAll,
}) => {
  return (
    <>
      {categoryModal && (
        <CategoryCreateModal
          isModalOpen={categoryModal}
          getCategoryAll={getCategoryAll}
          handleModal={() => setCategoryModal(false)}
        />
      )}

      {categoryEditModal && (
        <CategoryEditModal
          isModalOpen={categoryEditModal}
          getCategoryAll={getCategoryAll}
          handleModal={() => setCategoryEditModal(false)}
          categoryInfo={categoryInfo}
        />
      )}

      <QuestionCreateModal
        getCategoryAll={getCategoryAll}
        categoryId={categoryId}
        isModalOpen={questionModal}
        handleModal={() => setQuestionModal(false)}
      />
      <CategoryOrderEditModal
        getCategoryAll={getCategoryAll}
        isModalOpen={orderModal}
        handleModal={() => setOrderModal(false)}
      />
      {questionEditModal && (
        <QuestionEditModal
          getCategoryAll={getCategoryAll}
          isModalOpen={questionEditModal}
          questionInfo={questionInfo}
          handleModal={() => setQuestionEditModal(false)}
        />
      )}
    </>
  );
};

ActionsSideBarModals.propTypes = {
  categoryModal: PropTypes.bool,
  setCategoryModal: PropTypes.func,
  categoryEditModal: PropTypes.bool,
  setCategoryEditModal: PropTypes.func,
  questionModal: PropTypes.bool,
  questionEditModal: PropTypes.bool,
  setQuestionEditModal: PropTypes.func,

  setQuestionModal: PropTypes.func,
  orderModal: PropTypes.bool,
  setOrderModal: PropTypes.func,
  categoryId: PropTypes.number,
  categoryInfo: PropTypes.object,
  questionInfo: PropTypes.object,
  getCategoryAll: PropTypes.func,
};

export default ActionsSideBarModals;
