import { DependencyContainer } from "tsyringe";

// SPT types


import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { DatabaseServer } from "@spt/servers/DatabaseServer";

// DCAL IMPORT
import * as config from "../config/config.json";



class ModLoader implements  IPostDBLoadMod
{

 
    public postDBLoad(container: DependencyContainer): void {
        // Database will be loaded, this is the fresh state of the DB so NOTHING from the AKI
        // logic has modified anything yet. This is the DB loaded straight from the JSON files
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.info("Mod: Devil's PTT rebalance v1.0.1 loaded", LogTextColor.YELLOW);
        // lets do a quick modification and see how this reflect later on, on the postSptLoad()

        const dbTables = databaseServer.getTables();
        const traderIdsMapping: Record<string, string> = {
            prapor :"54cb50c76803fa8b248b4571",
            therapist :"54cb57776803fa99248b456e",
            fence :"58330581ace78e27b8b10cee",
            skier :"5935c25fb3acc3127c3d8cd9",
            peacekeeper :"5a7c2eca46aef81a7ca2145d",
            mechanic :"5ac3b934156ae10c4430e83c",
            ragman :"5c0647fdd443bc2504c2d371",
            evelyn :"Evelyn",
            anastasia :"Anastasia",
            svetlana :"Svetlana",
            artem :"ArtemTrader",
            scorpion :"6688d464bc40c867f60e7d7e",
            painter :"668aaff35fd574b6dcc4a686",
            lotus :"lotus",
            requisitions :"Requisitions"

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


        
        if (config.Add_Heal.enabled) {
            if (config.Add_Heal.Propital.enabled) {
                const PropitalToAssort = { //adds propital to Assort
                    "_id": "Propital",
                    "_tpl": "5c0e530286f7747fa1419862",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.Add_Heal.Propital.StackObjectsCount,
                        "BuyRestrictionMax": config.Add_Heal.Propital.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.Add_Heal.Propital.Buy_Restriction_Current
                    }
                };
                trader.assort.items.push(PropitalToAssort);

                trader.assort.barter_scheme["Propital"] = [ //defines config price for propital
                    [
                        {
                            "count": config.Add_Heal.Propital.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]

                ];
                trader.assort.loyal_level_items["Propital"] = config.Add_Heal.Propital.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);
            }

            if (config.Add_Heal.SJ0.enabled) {
                const SJ0ToAssort = { //adds sj0 to Assort
                    "_id": "SJ0",
                    "_tpl": "SJ0",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.Add_Heal.SJ0.StackObjectsCount,
                        "BuyRestrictionMax": config.Add_Heal.SJ0.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.Add_Heal.SJ0.Buy_Restriction_Current
                    }
                };
                trader.assort.items.push(SJ0ToAssort);

                trader.assort.barter_scheme["SJ0"] = [
                    [
                        {
                            "count": config.Add_Heal.SJ0.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]
                ];
                trader.assort.loyal_level_items["SJ0"] = config.Add_Heal.SJ0.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);

            }

            if (config.Add_Heal.AHF1M.enabled) {
                const AHF1ToAssort = { //adds AHF1 to Assort
                    "_id": "AHF1-M",
                    "_tpl": "5ed515f6915ec335206e4152",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.Add_Heal.AHF1M.StackObjectsCount,
                        "BuyRestrictionMax": config.Add_Heal.AHF1M.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.Add_Heal.AHF1M.Buy_Restriction_Current
                    }
                };
                trader.assort.items.push(AHF1ToAssort);

                trader.assort.barter_scheme["AHF1-M"] = [
                    [
                        {
                            "count": config.Add_Heal.AHF1M.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]
        
                ];
                trader.assort.loyal_level_items["AHF1-M"] = config.Add_Heal.AHF1M.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);
                
            }

            if (config.Add_Heal.IFAK.enabled) {
                const IFAKToAssort = { //adds IFAK to Assort
                    "_id": "IFAK",
                    "_tpl": "590c678286f77426c9660122",
                    "parentId": "hideout",
                    "slotId": "hideout",
                    "upd": {
                        "StackObjectsCount": config.Add_Heal.IFAK.StackObjectsCount,
                        "BuyRestrictionMax": config.Add_Heal.IFAK.Buy_Restriction_Max,
                        "BuyRestrictionCurrent": config.Add_Heal.IFAK.Buy_Restriction_Current
                    }
                };
            
                trader.assort.items.push(IFAKToAssort);

                trader.assort.barter_scheme["IFAK"] = [
                    [
                        {
                            "count": config.Add_Heal.IFAK.price,
                            "_tpl": "5449016a4bdc2d6f028b456f"
                        }
                    ]

                ];
                trader.assort.loyal_level_items["IFAK"] = config.Add_Heal.IFAK.loyalty_level;
                logger.logWithColor(`Propital added to ${config.Add_Item_to}.`, LogTextColor.GREEN);
            }
        }

    }
    
}

export const mod = new ModLoader();
