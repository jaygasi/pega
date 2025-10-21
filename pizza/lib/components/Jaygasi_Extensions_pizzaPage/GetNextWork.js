import { jsx as _jsx } from "react/jsx-runtime";
import { Button, useToaster } from '@pega/cosmos-react-core';
export default function GetNextWork(props) {
    const { getPConnect, variant } = props;
    const toasterCtx = useToaster();
    const localizedVal = PCore.getLocaleUtils().getLocaleValue;
    const localeCategory = 'Case';
    const getNextWork = () => {
        // alert('Get next work clicked');
        getPConnect()
            .getActionsApi()
            .getNextWork()
            .catch((err) => {
            console.log(err);
            if (err[0].status === 404) {
                toasterCtx.push({
                    content: localizedVal('No task currently available', localeCategory)
                });
            }
        });
    };
    return (_jsx(Button, { variant: variant, onClick: getNextWork, children: getPConnect().getLocalizedValue('Get next work', '', '') }));
}
