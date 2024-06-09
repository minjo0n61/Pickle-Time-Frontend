import styled from '@emotion/styled';

import SpecialPickleCard from '../picklecard/SpecialPickleCard';
import { useGetSpecialPickles } from '@/hooks/query/pickles';

import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

interface PickleCardListProps {
  category: 'hotTime' | 'popular';
}

const SLIDER_MOVE_VALUE = 288;

//TODO : 데이터 없을시 보여줄 ui 디자인하기
export default function PickleCardList({ category }: PickleCardListProps) {
  const { data } = useGetSpecialPickles(category);

  const [moveSliderValue, setMoveSliderValue] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const ListRef = useRef<HTMLUListElement>(null);
  const ListContainerRef = useRef<HTMLDivElement>(null);
  const [existData, setExistData] = useState<boolean>(false);

  useEffect(() => {
    if (!data) {
      setExistData(false);
    } else {
      setExistData(true);
    }
  }, []);

  const onMouseInEvent = () => {
    setIsMouseIn(true);
  };
  const onMouseLeaveEvent = () => {
    setIsMouseIn(false);
  };
  const handleLeftBtn = () => {
    if (moveSliderValue === 0) {
      return;
    }
    setMoveSliderValue(prev => prev - 1);
  };
  const handleRightBtn = () => {
    if (!ListRef.current || !ListContainerRef.current) return;

    if (moveSliderValue * SLIDER_MOVE_VALUE > ListRef?.current.offsetWidth - ListContainerRef?.current.offsetWidth) {
      return;
    }
    setMoveSliderValue(prev => prev + 1);
  };

  return (
    <S.Container ref={ListContainerRef}>
      <S.ListViewBox>
        <S.ListInner onMouseOver={onMouseInEvent} onMouseLeave={onMouseLeaveEvent}>
          <S.List $transLateX={moveSliderValue} ref={ListRef}>
            {data.length ? (
              data.map((pickle: any) => (
                <li key={pickle.id}>
                  <SpecialPickleCard pickleData={pickle} />
                </li>
              ))
            ) : (
              <h1>피클이 없네요 ㅠㅠ</h1>
            )}
          </S.List>
        </S.ListInner>
      </S.ListViewBox>
      <S.SliderControlBtn
        onClick={handleLeftBtn}
        $isShow={isMouseIn && existData}
        $position="left"
        onMouseOver={onMouseInEvent}
      >
        왼쪽
      </S.SliderControlBtn>
      <S.SliderControlBtn
        onClick={handleRightBtn}
        $isShow={isMouseIn && existData}
        $position="right"
        onMouseOver={onMouseInEvent}
      >
        오른쪽
      </S.SliderControlBtn>
    </S.Container>
  );
}

const S = {
  ListViewBox: styled.div`
    margin-left: -2.8rem;
    margin-right: -2.8rem;
    overflow-x: scroll;
    padding: 0.5rem 0;
    scrollbar-width: none;
    position: relative;
  `,
  ListInner: styled.div`
    display: inline-block;
    padding-left: 2.8rem;
    padding-right: 2.8rem;
  `,
  List: styled.ul<{ $transLateX: number }>`
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    transition: 0.5s;
    transform: ${({ $transLateX }) => `translateX(-${$transLateX * SLIDER_MOVE_VALUE}px)`};
  `,
  SliderControlBtn: styled.button<{ $position: 'right' | 'left'; $isShow: boolean }>`
    display: ${({ $isShow }) => ($isShow ? 'inline-block' : 'none')};
    width: 5rem;
    height: 5rem;
    background-color: #d9d9d9;
    z-index: 500;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({ $position }) => {
      if ($position === 'right') {
        return css`
          right: -2.5rem;
        `;
      } else {
        return css`
          left: -2.5rem;
        `;
      }
    }}
  `,
  Container: styled.div`
    position: relative;
  `,
};
