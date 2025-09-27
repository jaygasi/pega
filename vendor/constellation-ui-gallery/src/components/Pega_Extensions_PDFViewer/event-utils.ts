const handleEvent = (actions: any, eventType: string, propName: string, value: any) => {
  if (!actions) return;
  switch (eventType) {
    case 'change':
      if (typeof actions.updateFieldValue === 'function') actions.updateFieldValue(propName, value);
      break;
    case 'blur':
      if (typeof actions.triggerFieldChange === 'function') actions.triggerFieldChange(propName, value);
      break;
    case 'changeNblur':
      if (typeof actions.updateFieldValue === 'function') actions.updateFieldValue(propName, value);
      if (typeof actions.triggerFieldChange === 'function') actions.triggerFieldChange(propName, value);
      break;
    default:
      break;
  }
};

export default handleEvent;
