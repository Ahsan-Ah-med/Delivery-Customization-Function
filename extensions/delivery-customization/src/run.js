// @ts-check

// import { group } from "console";

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The configured entrypoint for the 'purchase.delivery-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  // The message to be added to the delivery option
  // const message = "May be delayed due to weather conditions";
  let toHide = input?.cart?.buyerIdentity?.customer?.hasTags[0].hasTag
  let toRename = input.cart.deliveryGroups
    // Filter for delivery groups with a shipping address containing the affected state or province
    // .filter(group => group.deliveryAddress?.provinceCode &&
    //   group.deliveryAddress.provinceCode == "NC")
    // Collect the delivery options from these groups
    // .filter(group => group?.deliveryOptions.filter(option => option.title == 'Standard'))
    // .flatMap(group => group.deliveryOptions)
    // // Construct a rename operation for each, adding the message to the option title
    // .map(option => /** @type {Operation} */({
    //   // rename: {
    //   //   deliveryOptionHandle: option.handle,
    //   //   title: option.title ? `${option.title} - ${message} - ${option.handle}` : message
    //   // },

    //   hide: {
    //     deliveryOptionHandle: toHide ? option.handle : ""
    //   }

    // }));
    .flatMap(group => group.deliveryOptions.filter(option => option.title === 'Standard'))
    .map(option => ({
      hide: {
        deliveryOptionHandle: toHide ? option.handle : ""
      }
    }));
  console.log(JSON.stringify(input?.cart?.deliveryGroups.filter(group => group?.deliveryOptions.filter(option => option?.title == 'Standard').length > 0)))

  const filteredDeliveryGroups = input?.cart?.deliveryGroups.map(group => ({
    ...group,
    deliveryOptions: group?.deliveryOptions.filter(option => option.title === 'Standard')
  }));

  // JSON.stringify(filteredDeliveryGroups);

  console.log(JSON.stringify(filteredDeliveryGroups))
  // console.log(JSON.stringify(toHide))
  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: toRename
  };
};
