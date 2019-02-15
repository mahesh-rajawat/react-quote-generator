<?php
/** 
* Webkul Software. 
* 
* @category Webkul 
* @package Webkul_MarketplaceiStock
* @author Webkul
* @copyright Copyright (c) WebkulSoftware Private Limited (https://webkul.com) 
* @license https://store.webkul.com/license.html 
* 
*/

namespace Webkul\MarketplaceiStock\Plugin\Magento\Downloadable\Ui\DataProvider\Product\Form\Modifier;

use Magento\Catalog\Model\Locator\LocatorInterface;
use Magento\Downloadable\Ui\DataProvider\Product\Form\Modifier\Composite;
use Magento\Framework\Stdlib\ArrayManager;
use Magento\Ui\Component\Container;
use Magento\Ui\Component\Form;

/**
 * Links class
 */
class Links 
{
    /**
     *
     * @param \Webkul\MarketplaceiStock\Helper\Data $helper
     */
    public function __construct(
        LocatorInterface $locator,
        ArrayManager $arrayManager,
        \Webkul\MarketplaceiStock\Helper\Data $helper
    ) {
        $this->helper = $helper;
        $this->locator = $locator;
        $this->arrayManager = $arrayManager;
    }

    /**
     * @see \Magento\Downloadable\Ui\DataProvider\Product\Form\Modifier\Links::modifyMeta()
     */
    public function afterModifyMeta (
        \Magento\Downloadable\Ui\DataProvider\Product\Form\Modifier\Links $subject,
        $result
    ) {
        $product = $this->locator->getProduct();
        if ($product->getAttributeSetId() == $this->helper->getIstockAttributeSetId()) {
            $linkSamplePath = $this->arrayManager->findPath('container_sample', $result, null, 'children');
            $result = $this->arrayManager->merge(
                $linkSamplePath . '/arguments/data/config',
                $result,
                array_merge(
                    [
                        'visible' => false
                    ]
                )
            );
            $recordPath = $this->arrayManager->findPath('record', $result, null, 'children');

            $result = $this->arrayManager->merge(
                $recordPath.'/children',
                $result,
                array_merge(
                    [
                        'resolution' => $this->getResolutionColumn()
                    ]
                )
                
            );
            //echo "<pre>"; print_r($recordPath);
            // echo "<pre>"; print_r($fromContainerPath);
            //echo "<pre>"; print_r($result); die;
        }
        return $result;
        // echo "<pre>"; print_r($this->locator->getProduct()->getData()); die;
    }

    /**
     * @return array
     */
    protected function getResolutionColumn()
    {
        $titleContainer['arguments']['data']['config'] = [
            'componentType' => Container::NAME,
            'formElement' => Container::NAME,
            'component' => 'Magento_Ui/js/form/components/group',
            'label' => __('Resolution'),
            'showLabel' => false,
            'dataScope' => '',
            'sortOrder' => 15,
        ];
        $titleField['arguments']['data']['config'] = [
            'formElement' => Form\Element\Input::NAME,
            'componentType' => Form\Field::NAME,
            'dataType' => Form\Element\DataType\Text::NAME,
            'dataScope' => 'resolution',
            'validation' => [
                'required-entry' => true,
            ],
        ];

        return $this->arrayManager->set('children/resolution', $titleContainer, $titleField);
    }
}
