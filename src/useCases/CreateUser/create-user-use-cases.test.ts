/*

Fix tests change service to createUseCases.execute
*/

describe("CreateUserUseCase", () => {
  let repositoryCustomer: any;
  xit("should save customer with userRepository", () => {
    const save = sinon.spy();
    const findByEmail = sinon.spy();
    const update = sinon.spy();
    const updateFullName = sinon.spy();
    const buildCountry = sinon.fake.returns(countries.US);
    const countryFactory = { buildCountry };

    const customerService = new CustomerService(
      { save, findByEmail, updateFullName, update },
      countryFactory
    );
    customerService.createCustomer("matheusfrancisco@hotmail.com", "123123");
    expect(save.called).toBeTruthy();
    expect(save.args[0][0] instanceof Customer).toBeTruthy();
    expect(save.args[0][0].email.value).toEqual("matheusfrancisco@hotmail.com");
  });
});
