import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import Accordion from '../../components/Accordion/Accordion';

function OrderList() {
  const { orderArray } = useSelector((store) => store.orders);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(orderArray.length);

  const changeAccordionVision = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    setOrderQuantity(orderArray.length);
  }, [orderArray]);

  return (
    <div>
      <Heading text="Listado de Ordenes" element="" />
      <div>
        <section
          className={`container max-w-screen-lg p-4 mx-auto border min-h-[550px] ${
            orderQuantity <= 0 && 'grid'
          }`}
        >
          {orderQuantity > 0 && (
            <>
              <header className="text-center sm:text-left">
                <h3 className="text-xl font-bold ">
                  Cantidad de Ordenes:
                  <span>{` ${orderArray.length}`}</span>
                </h3>
              </header>
              <div className="grid mt-5 overflow-auto">
                {orderArray.map((order, index) => (
                  <Accordion
                    key={order.id}
                    codigo={order.id}
                    index={index}
                    expandedIndex={expandedIndex}
                    toggle={changeAccordionVision}
                    date={order.fecha}
                    order={order}
                  />
                ))}
              </div>
            </>
          )}
          {orderQuantity <= 0 && (
            <>
              <header className="flex flex-col items-center justify-center w-full h-full py-3 text-center bg-black sm:py-6 rounded-xl">
                <h3 className="text-3xl font-bold text-white sm:text-5xl lg:text-6xl max-w-[15rem] sm:max-w-[20rem] md:max-w-[38rem]">
                  ¡No Existen Ordenes en el Sistema!
                </h3>
                <NavLink
                  to="/orden"
                  className="inline-block gap-1 p-2 px-4 mt-5 text-sm text-white transition bg-blue-700 rounded-lg sm:text-base md:hover:shadow-2xl md:hover:scale-105"
                >
                  Generar Orden
                </NavLink>
              </header>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default OrderList;