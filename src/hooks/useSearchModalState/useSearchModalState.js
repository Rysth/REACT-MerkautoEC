import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useSearchModalState(slice, dataActions, destroyAction, fetchAction) {
  const [searchData, setSearchData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [elementSelected, setElementSelected] = useState(null);
  const { matchedElements } = useSelector((store) => store[slice]);
  const dispatch = useDispatch();
  // Number of initial records to show
  const [records, setRecords] = useState(12);
  const loadMore = () => {
    setRecords(records + 12);
  };

  const handleSearchData = (inputValue) => {
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

  useEffect(() => {
    setRecords(12);
  }, [matchedElements]);

  return {
    searchData,
    showModal,
    elementSelected,
    matchedElements,
    handleSearchData,
    handleDeleteElement,
    handleModalOpen,
    handleModalClose,
    records,
    loadMore,
  };
}

export default useSearchModalState;
