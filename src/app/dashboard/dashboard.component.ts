
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

interface City {
    name: string,
    code: string
}

import { Router } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public pastWork: any[] = [{
        designation: '',
        startDate: '',
        endDate: '',
      
      }];
      addPastWork() {
        this.pastWork.push({
          id: this.pastWork.length + 1,
          designation: '',
          startDate: '',
          endDate: '',
        });
      }
      removePastWork(i: number) {
        this.pastWork.splice(i, 1);
      }
    productDialog: boolean;

    products: Product[];

    product: any;
    userInfo: any;

    selectedProducts: Product[];

    submitted: boolean;
    model: any = {};
    city: string;

    cities: City[];

    selectedCity: any;
    selectedTaluka: any;
    selectedDistrict: any;
    selectedEducation: any;
    selectedCader: any;

    userInformation = [
        {
            userId: '',
            userName: '',
            personalInfo: 
                {
                    name: '',
                    cader: '',
                    designation: '',
                    status: '',
                    dob: '',
                    retDate: '',
                    village: '',
                    selectedTaluka: '',
                    selectedDistrict: '',
                    selectedEducation: '',
                    selectedGender: '',
                },
            
            casteInfo: 
                {
                    caste: '',
                    subCaste: '',
                    casteValidityDate: ''
                                   
                },
            certificateInfo: 
                {
                    sthayiCert: '',
                    mehsulCert: '',
                    languageCert: '',
                    mscitCert: '',
                    punarvilokanCert: '',
                    departmentalEnquiry: '',
                    currentPosition: '',
                },
            
            contactInfo: 
                {
                    email: '',
                    contactNo: '',
                    
                }
            
        }

    ]

    selectedCategory: any = null;
    cader: any = null;
    status: any = null;
    categories: any[] = [{ name: 'आहे'}, { name: 'नाही'}];
    gender: any[] = [{ name: 'स्त्री' }, { name: 'पुरुष'}];
    taluka: any;
    district: any;
    education: any;






    constructor(private router: Router,
        private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {
        this.cities = [
            { name: 'अनुसूचित जाती', code: 'NY' },
            { name: 'भटक्या जमाती (ब)', code: 'RM' },
            { name: 'भटक्या जमाती (क)', code: 'LDN' },
            { name: 'भटक्या जमाती (ड)', code: 'IST' },
            { name: 'विमुक्त जाती (अ)', code: 'PRS' },
            { name: 'विशेष मागास वर्ग', code: 'IST' },
            { name: 'इमाव', code: 'PRS' },
            { name: 'खुला', code: 'PRS' }
        ];
        this.cader = [
            { name: 'भा.प्र.से.', code: 'NY' },
            { name: 'अपर जिल्हाधिकारी (निवडश्रेणी)', code: 'RM' },
            { name: 'अपर जिल्हाधिकारी', code: 'LDN' },
            { name: 'उपजिल्हाधिकारी (निवडश्रेणी)', code: 'IST' },
            { name: 'उपजिल्हाधिकारी', code: 'PRS' },
            { name: 'तहसिलदार', code: 'IST' },
            { name: 'नायब तहसिलदार', code: 'PRS' }
        ];
        this.status = [
            { name: 'कार्यरत', code: 'NY' },
            { name: 'इतर महसूल विभागात बदली', code: 'RM' },
            { name: 'प्रतिनियुक्तीवर', code: 'LDN' },
            { name: 'निलंबित', code: 'IST' },
            { name: 'बडतर्फ', code: 'PRS' },
            { name: 'स्वेच्छा सेवानिववृत्ती', code: 'IST' },
            { name: 'सेवानिवृत्त', code: 'PRS' },
            { name: 'नियुक्तीच्या प्रतिक्षेत', code: 'IST' },
            { name: 'गैरहजर', code: 'PRS' },
            { name: 'मय्यत', code: 'IST' },
            { name: 'रजेवर', code: 'PRS' },
        ]
        this.district = [
            { name: 'नागपूर', code: 'NY' },
            { name: 'वर्धा', code: 'RM' },
            { name: 'भंडारा', code: 'LDN' },
            { name: 'गोंदिया', code: 'IST' },
            { name: 'चंद्रपूर', code: 'PRS' },
            { name: 'गडचिरोली', code: 'IST' }

        ]
        this.education = [
            { name: '१० वी', code: 'NY' },
            { name: '१२ वी', code: 'RM' },
            { name: 'पदवीधर', code: 'LDN' },
            { name: 'पदव्युत्तर', code: 'IST' }

        ]
        this.taluka = [
            { name: 'नागपूर (शहर)', code: 'NY' },
            { name: 'नागपूर (ग्रामीण)', code: 'NY' },
            { name: 'कामठी', code: 'NY' },
            { name: 'हिंगणा', code: 'NY' },
            { name: 'काटोल', code: 'NY' },
            { name: ' नरखेड ', code: 'NY' },
            { name: 'सावनेर', code: 'NY' },
            { name: 'कळमेश्वर', code: 'NY' },
            { name: 'रामटेक', code: 'NY' },
            { name: 'पारशिवनी', code: 'NY' },
            { name: 'मौदा', code: 'NY' },
            { name: 'उमरेड', code: 'NY' },
            { name: 'भिवापूर', code: 'NY' },
            { name: 'कूही', code: 'NY' },
            { name: 'वर्धा', code: 'NY' },
            { name: 'सेलू', code: 'NY' },
            { name: 'देवळी', code: 'NY' },
            { name: 'हिंगणघाट', code: 'NY' },
            { name: 'समुद्रपूर', code: 'NY' },
            { name: 'आर्वी', code: 'NY' },
            { name: 'कारंजा', code: 'NY' },
            { name: 'आष्टी', code: 'NY' },
            { name: 'भंडारा', code: 'NY' },
            { name: 'तुमसर ', code: 'NY' },
            { name: 'मोहाडी', code: 'NY' },
            { name: 'पवनी', code: 'NY' },
            { name: 'साकोली', code: 'NY' },
            { name: 'लाखांदूर', code: 'NY' },
            { name: 'लाखनी', code: 'NY' },
            { name: 'गोंदिया', code: 'NY' },
            { name: 'गोरेगांव', code: 'NY' },
            { name: 'तिरोडा', code: 'NY' },
            { name: 'अर्जुनी-मोरगांव', code: 'NY' },
            { name: 'देवरी', code: 'NY' },
            { name: 'आमगांव', code: 'NY' },
            { name: 'सालेकसा', code: 'NY' },
            { name: 'सडक-अर्जुनी', code: 'NY' },
            { name: 'चंद्रपूर', code: 'NY' },
            { name: 'बल्लारपूर', code: 'NY' },
            { name: 'मूल', code: 'NY' },
            { name: 'गोंडपिपरी', code: 'NY' },
            { name: 'सावली', code: 'NY' },
            { name: '', code: 'NY' },
            { name: 'भद्रावती', code: 'NY' },
            { name: 'चिमूर', code: 'NY' },
            { name: 'ब्रम्हपूरी', code: 'NY' },
            { name: 'सिंदेवाही', code: 'NY' },
            { name: 'नागभिड', code: 'NY' },
            { name: 'राजूरा', code: 'NY' },
            { name: 'कोरपना', code: 'NY' },
            { name: 'पोंभूर्णा', code: 'NY' },
            { name: 'जिवती', code: 'NY' },
            { name: 'गडचिरोली', code: 'NY' },
            { name: 'धानोरा', code: 'NY' },
            { name: ' मूलचेरा', code: 'NY' },
            { name: 'चामोर्शी', code: 'NY' },
            { name: 'अहेरी ', code: 'NY' },
            { name: 'सिरोंचा', code: 'NY' },
            { name: 'एटापल्ली', code: 'NY' },
            { name: 'भामरागड', code: 'NY' },
            { name: 'वडसा/देसाईगंज', code: 'NY' },
            { name: 'आरमोरी ', code: 'NY' },
            { name: 'कुरखेडा', code: 'NY' },
            { name: 'कोरची', code: 'NY' }
        ]

    }

    ngOnInit() {
        this.productService.getProducts().subscribe(data => this.products = data);

    }
    fileName = 'ExcelSheet.xlsx';
    exportexcel(): void {
        /* table id is passed over here */
        let element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Tahsil');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);

    }

    openNew() {
        this.product = {};
        this.userInfo = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product) {
        console.log(product)

        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.key == product.key);
                console.log(this.products)
                // this.product = {};
                this.productService.deleteProduct(product.key);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.productService.addProduct(this.product);
        console.log(this.userInformation + this.selectedDistrict)
        if (this.userInformation[0].userName.trim()) {
            if (this.product.key) {
                this.products[this.findIndexById(this.product.key)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                this.product.key = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].key === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}
