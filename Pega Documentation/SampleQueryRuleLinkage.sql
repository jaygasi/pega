WITH CaseToFlow AS (
    -- Step 1: Extract Flows from Case Types
    SELECT
        ct.pyClassName AS CaseTypeClass,
        ct.pyRuleName AS CaseTypeName,
        flow.value('(pyFlowName/text())[1]', 'VARCHAR(255)') AS FlowName
    FROM
        pr4_rule_casetype ct
    CROSS APPLY
        ct.pzPVStream.nodes('//pyStages/rowdata/pyProcesses/rowdata') AS p(flow)
    WHERE
        ct.pyClassName = 'Our-Shops-Work-CustomerReview'
),
FlowToFlowAction AS (
    -- Step 2: Extract Flow Actions from Flows
    SELECT
        f.pyClassName AS FlowClass,
        f.pyRuleName AS FlowName,
        conn.value('(pyExpression/text())[1]', 'VARCHAR(255)') AS FlowActionName
    FROM
        pr4_rule_flow f
    CROSS APPLY
        f.pzPVStream.nodes('//pyConnectors/rowdata') AS c(conn)
    WHERE
        conn.value('(pyConditionType/text())[1]', 'VARCHAR(255)') = 'Action'
),
FlowActionToView AS (
    -- Step 3: Extract Views from Flow Actions
    SELECT
        fa.pyClassName AS FlowActionClass,
        fa.pyRuleName AS FlowActionName,
        fa.pzPVStream.value('(/pagedata/pyViewReference/text())[1]', 'VARCHAR(255)') AS ViewName
    FROM
        pr4_rule_flowaction fa
),
ViewToNestedView AS (
    -- Step 4: Extract Nested Views from Views
    SELECT
        v.pyClassName AS ParentViewClass,
        v.pyRuleName AS ParentViewName,
        nested.value('(config/name/text())[1]', 'VARCHAR(255)') AS NestedViewName,
        nested.value('(config/ruleClass/text())[1]', 'VARCHAR(255)') AS NestedViewClass
    FROM
        pr4_rule_view v
    CROSS APPLY
        v.pzPVStream.nodes('//pxViewMetadata/children//children') AS n(nested)
    WHERE
        nested.value('(config/type/text())[1]', 'VARCHAR(255)') = 'view'
)
-- Final Select: Join all the relationships together
SELECT
    ctf.CaseTypeClass,
    ctf.CaseTypeName,
    ctf.FlowName,
    ftfa.FlowActionName,
    fatv.ViewName AS MainViewName,
    vtv.NestedViewName,
    vtv.NestedViewClass
FROM
    CaseToFlow ctf
LEFT JOIN
    FlowToFlowAction ftfa ON ctf.FlowName = ftfa.FlowName AND ctf.CaseTypeClass = ftfa.FlowClass
LEFT JOIN
    FlowActionToView fatv ON ftfa.FlowActionName = fatv.FlowActionName AND ftfa.FlowClass = fatv.FlowActionClass
LEFT JOIN
    ViewToNestedView vtv ON fatv.ViewName = vtv.ParentViewName AND fatv.FlowActionClass = vtv.ParentViewClass
WHERE
    ctf.CaseTypeName = 'pyDefault';
