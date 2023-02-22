import { binanceServiceMain } from 'bot/common/api/binance_tiagosiebler-binance';
import { formatDateUnixToHumanAndIso } from 'common/utils';

export const getBinanceApiInfoAvailableOnlyInLive = async () => {
  // https://binance-docs.github.io/apidocs/spot/en/#account-status-user_data
  const accountStatus = await binanceServiceMain.getAccountStatus();

  // https://binance-docs.github.io/apidocs/spot/en/#account-api-trading-status-user_data
  const apiTradingStatus = await binanceServiceMain.getApiTradingStatus();

  // https://binance-docs.github.io/apidocs/spot/en/#get-api-key-permission-user_data
  const apiKeyPermissions = await binanceServiceMain.getApiKeyPermissions();
  const apiKeyPermissionsTransformed = {
    _createTimeFormatted: formatDateUnixToHumanAndIso(apiKeyPermissions.createTime).iso,
    ...apiKeyPermissions,
  };

  return {
    accountStatus,
    apiTradingStatus,
    apiKeyPermissions: apiKeyPermissionsTransformed,
  };
};
