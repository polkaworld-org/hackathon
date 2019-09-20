import React from 'react';

import { getAccount } from './Account';

export default function({ history }) {
  const account = getAccount();

  if (!account) {
    history.push('/login');
    return null;
  }

  return (
    <div>
      监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12监控23很健康2会空间2👌可2👌可2312块会2🉑️12
    </div>
  );
}
