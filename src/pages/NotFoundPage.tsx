import React from 'react';
import { ERROR_PAGE_DATA } from '../data/errorPage.data';
import ErrorPage from '../components/common/feedback/ErrorPage';
import Seo from '../components/common/Seo';

const NotFoundPage: React.FC = () => (
  <>
    <Seo title="Page Not Found" path="/404" noIndex />
    <ErrorPage
      code={ERROR_PAGE_DATA.code}
      title={ERROR_PAGE_DATA.title}
      message={ERROR_PAGE_DATA.message}
      buttonLabel={ERROR_PAGE_DATA.homepageLabel}
      buttonTo="/"
    />
  </>
);

export default NotFoundPage;
