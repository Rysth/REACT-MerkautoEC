import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useSearchModalState(slice, dataActions, destroyAction, fetchAction) {
  const [searchData, setSearchData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [elementSelected, setElementSelected] = useState(null);
  const { matchedElements } = useSelector((store) => store[slice]);
  const dispatch = useDispatch();

  const handleSearchData = (event) => {
    const inputValue = event.target.value;
    setSearchData(inputValue);

    if (inputValue !== '') {
      dispatch(dataActions.searchElement(inputValue));
      return;
    }

    dispatch(dataActions.startArrays());
  };

  const handleDeleteElement = (elementID) => {
    dispatch(destroyAction(elementID)).then(() => dispatch(fetchAction()));
  };

  const handleModalOpen = (elementID = null) => {
    if (elementID) {
      setElementSelected(
        matchedElements.find((element) => element.id === elementID),
      );
    } else {
      setElementSelected(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  useEffect(() => {}, [matchedElements]);

  return {
    searchData,
    showModal,
    elementSelected,
    matchedElements,
    handleSearchData,
    handleDeleteElement,
    handleModalOpen,
    handleModalClose,
  };
}

export default useSearchModalState;
