// Path: packages/spatial-engine/src/bom-calculator.ts

import { MaterialSKU, BOMItem } from '@aetherspace/core-types';

export interface SpaceDimensions {
  floorAreaSqm: number;
  wallPerimeterM: number;
  ceilingHeightM: number;
}

export class SpatialBOMCalculator {
  /**
   * 根据空间物理尺寸与选定的材质 SKU 列表，实时计算工程 BOM 清单
   */
  public static calculateBOM(
    dimensions: SpaceDimensions,
    selectedMaterials: {
      floorSku: MaterialSKU;
      wallSku: MaterialSKU;
      ceilingSku?: MaterialSKU;
    }
  ): { items: BOMItem[]; totalCostIdr: number } {
    const items: BOMItem[] = [];

    // 1. 地面物料算量 (含损耗系数)
    const floorNetQty = dimensions.floorAreaSqm;
    const floorGrossQty = Math.ceil(floorNetQty * (1 + selectedMaterials.floorSku.wasteFactor));
    items.push({
      skuId: selectedMaterials.floorSku.skuId,
      itemName: `[Floor] ${selectedMaterials.floorSku.name}`,
      quantity: floorGrossQty,
      unit: 'm²',
      unitPriceIdr: selectedMaterials.floorSku.priceIdr,
      totalPriceIdr: floorGrossQty * selectedMaterials.floorSku.priceIdr,
    });

    // 2. 墙面物料算量 (周长 * 层高 * 0.85 扣除门窗洞口经验系数 * 损耗)
    const wallNetQty = dimensions.wallPerimeterM * dimensions.ceilingHeightM * 0.85;
    const wallGrossQty = Math.ceil(wallNetQty * (1 + selectedMaterials.wallSku.wasteFactor));
    items.push({
      skuId: selectedMaterials.wallSku.skuId,
      itemName: `[Wall] ${selectedMaterials.wallSku.name}`,
      quantity: wallGrossQty,
      unit: 'm²',
      unitPriceIdr: selectedMaterials.wallSku.priceIdr,
      totalPriceIdr: wallGrossQty * selectedMaterials.wallSku.priceIdr,
    });

    // 3. 顶面物料算量 (如指定)
    if (selectedMaterials.ceilingSku) {
      const ceilingGrossQty = Math.ceil(dimensions.floorAreaSqm * (1 + selectedMaterials.ceilingSku.wasteFactor));
      items.push({
        skuId: selectedMaterials.ceilingSku.skuId,
        itemName: `[Ceiling] ${selectedMaterials.ceilingSku.name}`,
        quantity: ceilingGrossQty,
        unit: 'm²',
        unitPriceIdr: selectedMaterials.ceilingSku.priceIdr,
        totalPriceIdr: ceilingGrossQty * selectedMaterials.ceilingSku.priceIdr,
      });
    }

    const totalCostIdr = items.reduce((sum, item) => sum + item.totalPriceIdr, 0);

    return { items, totalCostIdr };
  }
}
