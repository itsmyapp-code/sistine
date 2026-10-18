import { NextResponse } from 'next/server';

const DEFAULT_MAILERLITE_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYWYyOTdhZTYwZWE1NjQ5Y2YzMTdkZDZjODAwOWM2ZDI0MmYwYmI5YzA4NTkyNmFhNzhjNjdmOTJiZTE0OTE3NjJkNDU1ZTczNGRiNTE0MzgiLCJpYXQiOjE3OTIzMjA3MzUuODM2MzU0LCJuYmYiOjE3OTIzMjA3MzUuODM2MzU1LCJleHAiOjQ5NDc5OTQzMzUuODMzMDEyLCJzdWIiOiIyNzQwMzkxIiwic2NvcGVzIjpbXX0.Hr0jTizaAGFtPBQR5mbeV0X-jITRCkOKevmF_t3aZgCsHvSxb3p4MMehS0M9eAOcr_H_T4uk1ybzj2AM2njp86caPCHTckkrlJvZ1RwBIxkxZ7RVKm7ckbRXWAtcND12AovCVRxv2r8kAa_YiPOzbo1YdjbwBjO32z_u67MKagjN_VjKbXZgryCS1jPBn7FFGrPYmGys62AP3xrw4Caue-NlMH3TULbjfMnpNalLTj2FEq4vLdpkFNxvLyPDl_TzbO-540xWkojy352tTpBLTq-f626kHO-_9p3uILQgGU21eijhdoNm3dc9dZDa1VG3D0-g0jrhM0V9YOlLFUI8gbD3s2s4Y1Gw7ebHeJZoVuGXAVYbDMh4yLV_7HwSzErzUsWcMdSLYc48Xnu0mGMH6VJFla4mBEsVGpWdxTjO_KMO-YBma5ZJoAvsvlSKISoqiLnys75waj5J0DJu2Q5Eo1Hb1sfAVf6X1z6kYRMkKIA5FWW54h6Bo0FJ9ys7wlme5-LB4sn7jnxmIfFTL4X-DH0sEYLtyYIzDjwSqdZrZe5xRm1mf4F1WdM9mJiFkjRUoD3I-0bpDpsW2eou3FPX6Cjl6rfAoTL3rVrYDRCyriWw2_vMgrzCD7IXGXlay7_kbeSb9Ib5QdCaGj1j58qobs3oACm7mU4Ok6HqY8pvxV0';

const DEFAULT_GROUP_ID = '201662840201807398';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Server-side field validation
    if (!data.fullName || !data.email) {
      return NextResponse.json(
        { error: 'Missing mandatory fields: Name and Email are required.' },
        { status: 400 }
      );
    }

    const token = process.env.MAILERLITE_API_KEY || DEFAULT_MAILERLITE_TOKEN;
    const groupId = process.env.MAILERLITE_GROUP_ID || DEFAULT_GROUP_ID;

    // Forward to Formspree
    try {
      await fetch('https://formspree.io/f/mzedwzjr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          phone: data.phone || '',
          email: data.email,
          service: data.service || '',
          postcode: data.postcode || 'Dartmouth',
          message: data.description || '',
          _subject: `New Estimate Request from ${data.fullName} (${data.service || 'Decorating'})`,
        }),
      });
    } catch (fsErr) {
      console.warn('Formspree sync in quote endpoint failed:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request logged successfully. An estimator will contact you shortly.',
      inquiryId: `inq-${Date.now()}`,
    });
  } catch (error) {
    console.error('Error handling quote POST:', error);
    return NextResponse.json(
      { error: 'Internal server error processing quote request.' },
      { status: 500 }
    );
  }
}
