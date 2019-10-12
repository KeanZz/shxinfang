using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Enums
{
    public enum BrokerType
    {
        Line=1,
        ContractGroup=2
    }
    /// <summary>
    /// Account报销状态
    /// </summary>
    public enum Status
    {
        待交材料到业支 = 1,
        业支合同审核通过 = 2,
        erp审批中 = 3,
        财务审核中 = 4,
        财务审核完成 = 5,
        业支审核驳回 = 6,
        经理审核通过=7,
        经理审核驳回=8

    }
    /// <summary>
    /// Account报销操作
    /// </summary>
    public enum OperateType
    {
        一线提交申请 = 1,
        业支审核通过 = 2,
        erp提单 = 3,
        交单至财务 = 4,
        财务审核通过 = 5,
        业支审核驳回 = 6,
        重新编辑 = 7,
        上传文件=8,
        经理审核通过 = 9,
        经理审核驳回 = 10,
        运营审核通过=12,
        运营审核驳回=13,
    }
}
