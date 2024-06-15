import { useState } from 'react';
import styled from '@emotion/styled';
import StarRating, { Rating } from '@/components/my-page/review/StarRating';
import Button from '@/components/common/button/Button';
import PLACEHOLDER from '@/constants/PLACEHOLDER';
import { useCreateReviewMutation } from '@/hooks/query/pickles';

/**
 * 리뷰작성 모달
 * - 1)별점 선택 2)텍스트 리뷰
 * - 별점 선택 시 선택한 별점과 리뷰작성할 수 있는 텍스트창 렌더(여기에서도 별점 수정가능)
 */

interface Props {
  handleClose: () => void;
}

const pickleId = '6666b9fdf5c3e2e975e0be57'; //임시

export default function ReviewModal({ handleClose }: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isRatingSelected, setIsRatingSelected] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const { mutate: postReviewMutate } = useCreateReviewMutation(pickleId, () => handleClose());

  const handleStarHover = (rating: Rating) => {
    if (!isRatingSelected) {
      setSelectedRating(rating);
    }
  };

  const handleStarClick = (rating: Rating) => {
    setSelectedRating(rating);
    setIsRatingSelected(true);
  };

  const handleReviewSubmit = () => {
    postReviewMutate({ star: selectedRating, reviewText });
    setSelectedRating(0);
    setIsRatingSelected(false);
    setReviewText('');
  };

  return (
    <S.Container>
      {isRatingSelected ? (
        <S.ReviewInputSection>
          <S.Title>리뷰쓰기</S.Title>
          <S.PickleName className="input-section">토익 850 목표 스터디</S.PickleName>
          <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
          <S.TextArea
            placeholder={PLACEHOLDER.REVIEW.WRITE}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <Button onClick={handleReviewSubmit}>작성 완료하기</Button>
        </S.ReviewInputSection>
      ) : (
        <S.RatingChoiceSection>
          <S.Title>이 피클은 어떠셨나요?</S.Title>
          <S.PickleName className="rating-section">토익 850 목표 스터디</S.PickleName>
          <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
        </S.RatingChoiceSection>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `,

  ReviewInputSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding: 0.5rem 0 1.4rem;

    & .input-section {
      margin: 3.3rem 0 1.8rem;
    }
  `,

  RatingChoiceSection: styled.div`
    padding: 13rem 0;

    & .rating-section {
      margin: 0.5rem 0 4.5rem;
    }
  `,

  Title: styled.h2`
    color: ${({ theme }) => theme.color.basic};
    ${({ theme }) => theme.typography.subTitle1};
  `,

  PickleName: styled.div`
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.subTitle3};
  `,

  TextArea: styled.textarea`
    width: 100%;
    height: 18rem;
    padding: 1.8rem 0;
    margin: 2.8rem 0;
    border: none;
    border-top: ${({ theme }) => theme.border};
    border-bottom: ${({ theme }) => theme.border};

    overflow-y: auto; //스크롤이 왜 안보일까요?
    font-size: 1.6rem;

    ::placeholder {
      color: ${({ theme }) => theme.color.inputText};
      ${({ theme }) => theme.typography.body1}
    }
  `,
};
