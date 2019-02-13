// Instantiate object (this is the most important part)
            $customer   = $this->customerFactory->create();
            $customer->setWebsiteId($websiteId);

            // Preparing data for new customer
            $customer->setEmail($credentials['username']);
            $customer->setFirstname($name[0]);
            $customer->setLastname($name[1]);

            $customer = $this->accountManagement
                ->createAccount($customer, null, $redirectUrl);

            $this->_eventManager->dispatch(
                'customer_register_success',
                ['account_controller' => $this, 'customer' => $customer]
            );

            $this->session->setCustomerDataAsLoggedIn($customer);
