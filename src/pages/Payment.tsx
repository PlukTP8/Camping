import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, CreditCard, FileText, ArrowLeft } from 'lucide-react';

interface PaymentFormData {
  amount: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentSlip?: FileList;
}

const Payment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount') || '0';
  const spotName = searchParams.get('spotName') || '';

  const form = useForm<PaymentFormData>({
    defaultValues: {
      amount: amount.replace('฿', '').replace(',', ''),
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "ไฟล์ไม่ถูกต้อง",
          description: "กรุณาอัปโหลดไฟล์รูปภาพ (JPG, PNG) หรือ PDF เท่านั้น",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "ไฟล์ใหญ่เกินไป",
          description: "กรุณาอัปโหลดไฟล์ขนาดไม่เกิน 5MB",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
      toast({
        title: "อัปโหลดสำเร็จ",
        description: `ไฟล์ ${file.name} ถูกอัปโหลดเรียบร้อยแล้ว`,
      });
    }
  };

  const onSubmit = async (data: PaymentFormData) => {
    if (!uploadedFile) {
      toast({
        title: "กรุณาอัปโหลดสลิปการโอนเงิน",
        description: "ต้องแนบสลิปการโอนเงินเพื่อยืนยันการชำระเงิน",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "ส่งข้อมูลการชำระเงินสำเร็จ",
        description: "เราจะตรวจสอบการชำระเงินและแจ้งผลให้ทราบภายใน 24 ชั่วโมง",
      });
      
      setIsProcessing(false);
      
      // Navigate back to bookings after successful submission
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-camping-earth-light to-camping-nature-light">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="outline"
              onClick={() => navigate('/bookings')}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้าการจอง
            </Button>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <CreditCard className="h-6 w-6 text-camping-earth-dark" />
                  การชำระเงิน
                </CardTitle>
                <CardDescription>
                  กรุณากรอกข้อมูลและแนบสลิปการโอนเงิน
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Payment Summary */}
                <div className="bg-camping-green/5 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-camping-earth-dark mb-2">สรุปการจอง</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>หมายเลขการจอง:</span>
                      <span className="font-medium">#{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>จุดกางเต๊นท์:</span>
                      <span className="font-medium">{spotName}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-camping-earth-dark border-t pt-2 mt-2">
                      <span>ยอดที่ต้องชำระ:</span>
                      <span>{amount}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Account Info */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-900 mb-2">ข้อมูลบัญชีสำหรับโอนเงิน</h3>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div><strong>ธนาคาร:</strong> กสิกรไทย</div>
                    <div><strong>เลขบัญชี:</strong> 123-4-56789-0</div>
                    <div><strong>ชื่อบัญชี:</strong> บริษัท แคมป์ปิ้ง รีสอร์ท จำกัด</div>
                  </div>
                </div>

                {/* Payment Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>จำนวนเงินที่โอน (บาท)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" readOnly className="bg-gray-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ชื่อ-นามสกุล ผู้โอนเงิน *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="กรุณากรอกชื่อ-นามสกุล" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>อีเมล *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="example@email.com" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>เบอร์โทรศัพท์ *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="08x-xxx-xxxx" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* File Upload */}
                    <div className="space-y-4">
                      <FormLabel>สลิปการโอนเงิน *</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="payment-slip"
                        />
                        <label
                          htmlFor="payment-slip"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          {uploadedFile ? (
                            <>
                              <CheckCircle className="h-12 w-12 text-green-500" />
                              <p className="text-green-600 font-medium">{uploadedFile.name}</p>
                              <p className="text-sm text-gray-500">คลิกเพื่อเปลี่ยนไฟล์</p>
                            </>
                          ) : (
                            <>
                              <Upload className="h-12 w-12 text-gray-400" />
                              <p className="text-gray-600">คลิกเพื่ืออัปโหลดสลิปการโอนเงิน</p>
                              <p className="text-sm text-gray-500">ไฟล์ JPG, PNG หรือ PDF (ขนาดไม่เกิน 5MB)</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          กำลังส่งข้อมูล...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          ส่งข้อมูลการชำระเงิน
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payment;