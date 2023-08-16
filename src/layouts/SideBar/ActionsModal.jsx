import CategoryCreateModal from "../../components/CategoryItem/CategoryViewEditModal/CategoryCreateModal.jsx";
import CategoryEditModal from "../../components/CategoryItem/CategoryViewEditModal/CategoryEditModal.jsx";
import QuestionCreateModal from "../../components/Question/QuestionEditCreate/QuestionCreateModal.jsx";
import CategoryOrderEditModal from "../../components/CategoryItem/CategoryViewEditModal/CategoryOrderEditModal.jsx";
import React from "react";
import PropTypes from "prop-types";

const ActionsSideBarModals = ({
    categoryModal,
    setCategoryModal,
    categoryEditModal,
    setCategoryEditModal,
    questionModal,
    setQuestionModal,
    orderModal,
    setOrderModal,
    }) => {
    return (
        <>
            <CategoryCreateModal
                isModalOpen={categoryModal}
                handleModal={() => setCategoryModal(false)}
            />
            <CategoryEditModal
                isModalOpen={categoryEditModal}
                handleModal={() => setCategoryEditModal(false)}
            />
            <QuestionCreateModal
                isModalOpen={questionModal}
                handleModal={() => setQuestionModal(false)}
            />
            <CategoryOrderEditModal
                isModalOpen={orderModal}
                handleModal={() => setOrderModal(false)}
            />
        </>

    )
}

ActionsSideBarModals.propTypes= {
    categoryModal: PropTypes.bool,
    setCategoryModal: PropTypes.func,
    categoryEditModal: PropTypes.bool,
    setCategoryEditModal: PropTypes.func,
    questionModal: PropTypes.bool,
    setQuestionModal: PropTypes.func,
    orderModal: PropTypes.bool,
    setOrderModal: PropTypes.func,
}

export default ActionsSideBarModals;