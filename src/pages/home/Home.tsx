import { Link, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/zustand/useAuth';
import KaKaoMap from '@/components/map/KaKaoMap';
import routes from '@/constants/routes';
import BackDropModal from '@/components/common/modal/BackDropModal';
import { Suspense, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import HeartButton from '@/components/common/button/HeartButton';
import { useCreatePickleMutation } from '@/hooks/query/pickles';
import MainLayout from '@/layouts/MainLayout';
import Carousel from '@/components/carousel/Carousel';
import PickleList from '@/components/picklecardlist/PickleCardListElement';
import PickleCardList from '@/components/picklecardlist/PickleCardList';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SkeletonPickleCardList from '@/components/picklecardlist/PickleCardList.Skeleton';

const Button = styled.button`
  color: hotpink;
  border: 1px solid black;
`;

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 전역 상태
  const { getMe, signOut } = useAuth();

  return (
    <MainLayout>
      <Carousel />
      <PickleList.Container>
        <PickleList.Header category="popular" />
        <ErrorBoundary fallback={Error}>
          <Suspense fallback={<SkeletonPickleCardList />}>
            <PickleCardList category="popular" />
          </Suspense>
        </ErrorBoundary>
      </PickleList.Container>
      <PickleList.Container sectionBg>
        <PickleList.Header category="hotTime" />
        <ErrorBoundary fallback={Error}>
          <Suspense fallback={<SkeletonPickleCardList />}>
            <PickleCardList category="hotTime" />
          </Suspense>
        </ErrorBoundary>
      </PickleList.Container>
      <div>
        {getMe() ? (
          <>
            안녕하세요 {getMe()?.nickname}님 <button onClick={signOut}>로그아웃</button>
          </>
        ) : (
          <Link to={routes.signIn}>Sign In</Link>
        )}
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={routes.chatList}>Chat List</Link>
          <Link to={'/pickle/6662941ec1151126a67f6530'}>테스트 피클 보기+신청하기테스트</Link>
        </div>
        <Button type="button" onClick={() => navigate('/pickle-create')}>
          피클 생성 페이지로 이동
        </Button>
        <br />
        <br />
        <br />

      {/* <KaKaoMap /> */}
      {/* <Button type="button" onClick={openModal}>
        모달 테스트 버튼
      </Button> */}
      {/* <BackDropModal isOpen={isModalOpen} onClose={closeModal}>
        <div>티라노 앙</div>
      </BackDropModal> */}
      {/* <HeartButton isActive={isHeartClicked} onClick={handleHeartClick} /> */}
    </MainLayout>
  );
}

function Error({ error }: { error: Error }) {
  console.log(error);
  return <h1>에러 발생</h1>;
}
