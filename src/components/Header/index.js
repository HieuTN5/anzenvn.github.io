import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultHeader } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();

  return <DefaultHeader headerTitleRender="aaaa" />;
};
