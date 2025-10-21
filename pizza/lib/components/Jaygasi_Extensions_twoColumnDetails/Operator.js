import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
import { useState, useEffect, Fragment } from 'react';
import { Link, Button, Popover, useOuterEvent, useElement, Progress, FormField, useTheme, withConfiguration } from '@pega/cosmos-react-core';
import { Glimpse } from '@pega/cosmos-react-work';
import { EmailDisplay } from '@pega/cosmos-react-core';
import Avatar from './Avatar';
let pTarget = null;
function Operator(props) {
    const { id, name, label, testId, helperText, externalUser, metaObj } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [popoverEl, setPopoverEl] = useElement(null);
    const [popoverContent, setpopoverContent] = useState(null);
    const theme = useTheme();
    /* If the id has changed, we need to reset the popover */
    useEffect(() => {
        pTarget = null;
    }, [id]);
    const OperatorPreview = () => {
        const localizedVal = PCore.getLocaleUtils().getLocaleValue;
        const localeCategory = 'Operator';
        setpopoverContent(_jsx(Progress, { variant: 'ring', message: localizedVal('Loading operator...', localeCategory), placement: 'local' }));
        if (externalUser && externalUser.classID !== 'Data-Party-Operator') {
            const fields = [
                {
                    id: 'pyFirstName',
                    name: localizedVal('Name', localeCategory),
                    value: externalUser.name
                },
                {
                    id: 'pyEmail1',
                    name: localizedVal('Email', localeCategory),
                    value: externalUser.email !== '' ? _jsx(Link, { href: `mailto:${externalUser.email}`, children: externalUser.email }) : ''
                },
                {
                    id: 'pyPhoneNumber',
                    name: localizedVal('Phone', localeCategory),
                    value: externalUser.phone !== '' ? _jsx(Link, { href: `tel:${externalUser.phone}`, children: externalUser.phone }) : ''
                }
            ];
            setIsLoading(false);
            setpopoverContent(_jsx(Glimpse, { visual: _jsx(Avatar, { metaObj: {
                        name: externalUser.name
                    } }), primary: externalUser.name, secondary: [externalUser.position], fields: fields, target: pTarget }));
        }
        else {
            return PCore.getUserApi()
                .getOperatorDetails(id, true)
                .then(res => {
                if (res.data?.pyOperatorInfo) {
                    const fields = [];
                    const data = res.data;
                    if (data.pyOperatorInfo && data.pyOperatorInfo.pyUserName) {
                        fields.push({
                            id: 'Name',
                            name: localizedVal('Name', localeCategory),
                            value: data.pyOperatorInfo.pyUserName
                        });
                    }
                    if (data.pyOperatorInfo && data.pyOperatorInfo.pyEmailAddress) {
                        fields.push({
                            id: 'Email',
                            name: localizedVal('Email address', localeCategory),
                            value: _jsx(EmailDisplay, { value: data.pyOperatorInfo.pyEmailAddress })
                        });
                    }
                    const opAvatar = (_jsx(Avatar, { metaObj: {
                            image: '',
                            name: data.pyOperatorInfo.pyUserName
                        } }));
                    setIsLoading(false);
                    setpopoverContent(_jsx(Glimpse, { heading: {
                            primary: data.pyOperatorInfo.pyUserName,
                            secondary: data.pyOperatorInfo.pyEmailAddress,
                            visual: opAvatar
                        }, fields: fields, target: pTarget, onDismiss: () => { pTarget = null; } }));
                }
            });
        }
    };
    const clickAction = (e) => {
        setIsOpen(!isOpen);
        if (pTarget === null) {
            pTarget = e.currentTarget;
            OperatorPreview();
        }
    };
    const hidePopover = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };
    useOuterEvent('mousedown', [popoverEl], hidePopover); // Call the method on clicking outside these elements
    const hideOnEscape = (e) => {
        if (e.key === 'Escape')
            hidePopover(); // Call the method when Escape key is pressed
    };
    const comp = (_jsxs(Fragment, { children: [metaObj ? (_jsx(Button, { variant: 'text', "aria-haspopup": true, "aria-expanded": isOpen, onClick: clickAction, onKeyDown: hideOnEscape, "data-test-id": testId, style: label !== null ? { width: 'max-content', height: theme.components.input.height } : undefined, children: _jsx(Avatar, { ...props }) })) : (_jsx(Button, { variant: 'link', "aria-haspopup": true, "aria-expanded": isOpen, onClick: clickAction, onKeyDown: hideOnEscape, "data-test-id": testId, style: label !== null ? { width: 'max-content', height: theme.components.input.height } : undefined, children: name })), isOpen && (_jsx(Popover, { ref: setPopoverEl, groupId: 'operator', target: pTarget, placement: 'bottom-start', style: isLoading ? { position: 'relative', width: '10rem', minHeight: '4rem' } : undefined, strategy: 'fixed', children: popoverContent }))] }));
    if (label !== null) {
        return (_jsx(FormField, { label: label, info: helperText, children: comp }));
    }
    return comp;
}
;
export default withConfiguration(Operator);
