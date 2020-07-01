
window.cubeIconClass = {};
window.cubeIconClass.Y ="cube cube-Y fa fa-coins";
window.cubeIconClass.B ="cube cube-B fa fa-user-shield";
window.cubeIconClass.K ="cube cube-K fa fa-credit-card";
window.cubeIconClass.R ="cube cube-R fa fa-bomb";
window.cubeIconClass.W ="cube cube-W fa fa-briefcase-medical";


window.cubeDrawTitle = {};
window.cubeDrawTitle.KK = "Economic Downturn";
window.cubeDrawTitle.BK = "Underfunded Police Force";
window.cubeDrawTitle.KR = "Political Corruption";
window.cubeDrawTitle.RY = "Anti-Austerity Protests";
window.cubeDrawTitle.RR = "Industrial Violations";
window.cubeDrawTitle.RW = "Welfare Cheats";
window.cubeDrawTitle.WW = "Back-to-Work Programme";
window.cubeDrawTitle.YY = "Budget Surplus";
window.cubeDrawTitle.KY = "Early Repayments";
window.cubeDrawTitle.BY = "Security Spending";
window.cubeDrawTitle.BB = "Falling Crime Rates";
window.cubeDrawTitle.BR = "Special Operations";
window.cubeDrawTitle.BW = "Welfare Cheat Crackdown";
window.cubeDrawTitle.WY = "Nationalised Healthcare Spending";
window.cubeDrawTitle.KW = "Welfare Budget Problems";

window.cubeDrawDescription = {};
window.cubeDrawDescription.KK = "Reduce Wealth by one and increase cuts on every institution by one";
window.cubeDrawDescription.BK = "Spend <i class='" + window.cubeIconClass.Y + "' ></i> or add <i class='" + window.cubeIconClass.R + "' ></i> (+ Cuts)";
window.cubeDrawDescription.KR = "Decrease Popularity by one (+ Cuts)";
window.cubeDrawDescription.RY = "Either Remove <i class='" + window.cubeIconClass.Y + "' ></i> and <i class='" + window.cubeIconClass.R + "' ></i> or increase Popularity by one and add <i class='" + window.cubeIconClass.K + "' ></i>";
window.cubeDrawDescription.RR = "Decrease Public Safety by two";
window.cubeDrawDescription.RW = "Decrease Employment by one";
window.cubeDrawDescription.WW = "Increase Employment by two";
window.cubeDrawDescription.YY = "Increase Wealth by one; may spend both cubes to fund a single already-funded institution";
window.cubeDrawDescription.KY = "Optionally Spend <i class='" + window.cubeIconClass.Y + "' ></i> to Remove <i class='" + window.cubeIconClass.K + "' ></i> (or Cuts)";
window.cubeDrawDescription.BY = "Increase Popularity or Public Safety by one";
window.cubeDrawDescription.BB = "Increase Public Safety by two";
window.cubeDrawDescription.BR = "Either Remove <i class='" + window.cubeIconClass.B + "' ></i> and <i class='" + window.cubeIconClass.R + "' ></i> or reduce Public Safety by one";
window.cubeDrawDescription.BW = "Either Remove <i class='" + window.cubeIconClass.W + "' ></i> or increase Employment by one and decrease Popularity by one";
window.cubeDrawDescription.WY = "Increase Health by two";
window.cubeDrawDescription.KW = "Spend <i class='" + window.cubeIconClass.Y + "' /> or reduce Health by one. (+ Cuts)";

window.actionDescription = {};
window.actionDescription.KK = {};
window.actionDescription.KK.ReduceWealth = "Reduce Wealth by one";
window.actionDescription.KK.IncreaseCuts = "Increase cuts on every institution by one";
window.actionDescription.BK = {};
window.actionDescription.BK.SpendY = "Spend <i class='" + window.cubeIconClass.Y + "' ></i>";
window.actionDescription.BK.AddR = "Add <i class='" + window.cubeIconClass.R + "' ></i>";
window.actionDescription.KR = {};
window.actionDescription.KR.DecreasePopularity = "Decrease Popularity by one";
window.actionDescription.RY = {};
window.actionDescription.RY.RemoveYR = "Either Remove <i class='" + window.cubeIconClass.Y + "' ></i> and <i class='" + window.cubeIconClass.R + "' ></i>";
window.actionDescription.RY.IncreasePopularityAddK = "Increase Popularity by one and add <i class='" + window.cubeIconClass.K + "' ></i>";
window.actionDescription.RR = {};
window.actionDescription.RR.DecreasePS2 = window.cubeDrawDescription.RR;
window.actionDescription.RW = {};
window.actionDescription.RW.DecreaseEmployment = window.cubeDrawDescription.RW;
window.actionDescription.WW = {};
window.actionDescription.WW.IncreaseEmployment2 = window.cubeDrawDescription.WW;
window.actionDescription.YY = {};
window.actionDescription.YY.IncreaseWealth = "Increase Wealth by one";
window.actionDescription.YY.SpendYY = "Spend both cubes to fund a single already-funded institution";
window.actionDescription.YY.NO = "Don't do it";
window.actionDescription.KY = {};
window.actionDescription.KY.SpendYRemoveK = "Spend <i class='" + window.cubeIconClass.Y + "' ></i> to Remove <i class='" + window.cubeIconClass.K + "' ></i>";
window.actionDescription.KY.Cuts = "Cuts";
window.actionDescription.BY = {};
window.actionDescription.BY.IncreasePopularity = "Increase Popularity";
window.actionDescription.BY.IncreasePS = "Increase Public Safety";
window.actionDescription.BB = {};
window.actionDescription.BB.IncreasePS = window.cubeDrawDescription.BB;
window.actionDescription.BR = {};
window.actionDescription.BR.RemoveBR = "Either Remove <i class='" + window.cubeIconClass.B + "' ></i> and <i class='" + window.cubeIconClass.R + "' ></i>";
window.actionDescription.BR.ReducePS = "Reduce Public Safety";
window.actionDescription.BW = {};
window.actionDescription.BW.RemoveW = "Remove <i class='" + window.cubeIconClass.W + "' ></i>";
window.actionDescription.BW.IncreaseEmploymentDecreasePopularity = "Increase Employment by one and decrease Popularity by one";
window.actionDescription.WY = {};
window.actionDescription.WY.IncreaseHealth = window.cubeDrawDescription.WY;
window.actionDescription.KW = {};
window.actionDescription.KW.SpendY = "Spend <i class='" + window.cubeIconClass.Y + "' ></i>";
window.actionDescription.KW.ReduceHealth = "Reduce Health by one";




window.actionDescription.IncreaseCuts = {};
window.actionDescription.IncreaseCuts.PE = "Increase cuts on Private Enterprise";
window.actionDescription.IncreaseCuts.NS = "Increase cuts on National Security";
window.actionDescription.IncreaseCuts.SW = "Increase cuts on Social Welfare";



window.actionDescription.Funds = {};
window.actionDescription.Funds.Discard = "Move <i class='" + window.cubeIconClass.Y + "' ></i> to the Used area";
window.actionDescription.Funds.Treasury = "Place <i class='" + window.cubeIconClass.Y + "' ></i> into your Treasury";
window.actionDescription.Funds.Fund = "Fund an Institution";




//alert
window.alertMsg = {};
window.alertMsg.NoIncome = "No Income available in Treasury";
