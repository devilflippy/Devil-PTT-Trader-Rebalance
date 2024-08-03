import { DependencyContainer } from "tsyringe";

// SPT types


import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { DatabaseServer } from "@spt/servers/DatabaseServer";

// DCAL IMPORT
import * as config from "../config/config.json";
import * as traderconfig from "../config/trader_config.json";



class ModLoader implements  IPostDBLoadMod
{

 
    public postDBLoad(container: DependencyContainer): void {

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.info("Mod: Devil's PTT rebalance v1.0.1 loaded", LogTextColor.YELLOW);


        const dbTables = databaseServer.getTables();
        const traderIdsMapping: Record<string, string> = {
            traderconfig
        }
        const getTraderId = (traderName: string): string => {
            const traderNameLowerCased = traderName.toLowerCase()
            const foundId = traderIdsMapping[traderNameLowerCased]
          
            if (!foundId) {
                return traderName
            }
          
            return foundId
        }
        const traderId = getTraderId(config.Add_Item_to)
        const trader = dbTables.traders[traderId]


        
        if (config.New_Item.enabled) {
            if (config.New_Item.Propital.enabled) {
                const PropitalToAssort = { //adds propital to Assort
                    "_id": "Propital",
                    "_tpl": "5c0e530286f7747fa1419862",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.New_Item.Propital.StackObjectsCount,
                        "BuyRestrictionMax": config.New_Item.Propital.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.New_Item.Propital.Buy_Restriction_Current
                    }
                };
                trader.assort.items.push(PropitalToAssort);

                trader.assort.barter_scheme["Propital"] = [ //defines config price for propital
                    [
                        {
                            "count": config.New_Item.Propital.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]

                ];
                trader.assort.loyal_level_items["Propital"] = config.New_Item.Propital.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);
            }

            if (config.New_Item.SJ0.enabled) {
                const SJ0ToAssort = { //adds sj0 to Assort
                    "_id": "SJ0",
                    "_tpl": "SJ0",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.New_Item.SJ0.StackObjectsCount,
                        "BuyRestrictionMax": config.New_Item.SJ0.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.New_Item.SJ0.Buy_Restriction_Current
                    }
                };
                trader.assort.items.push(SJ0ToAssort);

                trader.assort.barter_scheme["SJ0"] = [
                    [
                        {
                            "count": config.New_Item.SJ0.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]
                ];
                trader.assort.loyal_level_items["SJ0"] = config.New_Item.SJ0.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);

            }

            if (config.New_Item.AHF1M.enabled) {
                const AHF1ToAssort = { //adds AHF1 to Assort
                    "_id": "AHF1-M",
                    "_tpl": "5ed515f6915ec335206e4152",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.New_Item.AHF1M.StackObjectsCount,
                        "BuyRestrictionMax": config.New_Item.AHF1M.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.New_Item.AHF1M.Buy_Restriction_Current
                    }
                };
                trader.assort.items.push(AHF1ToAssort);

                trader.assort.barter_scheme["AHF1-M"] = [
                    [
                        {
                            "count": config.New_Item.AHF1M.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]
        
                ];
                trader.assort.loyal_level_items["AHF1-M"] = config.New_Item.AHF1M.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);
                
            }

            if (config.New_Item.IFAK.enabled) {
                const IFAKToAssort = { //adds IFAK to Assort
                    "_id": "IFAK",
                    "_tpl": "590c678286f77426c9660122",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.New_Item.IFAK.StackObjectsCount,
                        "BuyRestrictionMax": config.New_Item.IFAK.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.New_Item.IFAK.Buy_Restriction_Current
                    }
                };
            
                trader.assort.items.push(IFAKToAssort);

                trader.assort.barter_scheme["IFAK"] = [
                    [
                        {
                            "count": config.New_Item.IFAK.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]

                ];
                trader.assort.loyal_level_items["IFAK"] = config.New_Item.IFAK.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);
            }
        }

    }
    
}

export const mod = new ModLoader();
